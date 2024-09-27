// Import necessary models and utilities
import Event from '../models/Event.js';
import Match from '../models/Match.js';
import drawMatches from '../utils/matchDrawing.js';

// Controller function to create an event and automatically generate matches
export const createEvent = async (req, res) => {
  const { name, matchType, players, umpires } = req.body;

  try {
    // Create the event with the initial data
    const event = new Event({
      name,
      organizer: req.user.id, // Assuming req.user.id contains the organizer's ID
      matchType,
      players,
      umpires,
    });

    // Save the event to the database
    await event.save();

    // Draw matches based on the event type (League or Knockout)
    const matches = await drawMatches(matchType, players, umpires, event._id);

    // Check if matches were generated successfully
    if (!matches || matches.length === 0) {
      return res.status(400).json({ message: 'No matches generated. Please check the match type and players.' });
    }

    // Save the generated matches to the Match collection
    const savedMatches = await Match.insertMany(matches);

    // Link the matches to the event by storing their IDs
    event.matches = savedMatches.map((match) => match._id);

    // Save the updated event with the linked matches
    await event.save();

    // Respond with the created event and a success message
    res.status(201).json({ message: 'Event and matches created successfully!', event });
  } catch (error) {
    // Handle errors and send a server error response
    console.error(error.message);
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Utility function to draw matches based on match type
const drawMatches = async (matchType, players, umpires, eventId) => {
  try {
    if (matchType === 'League') {
      return await createLeagueMatches(eventId, players, umpires);
    } else if (matchType === 'Knockout') {
      return await createKnockoutMatches(eventId, players, umpires);
    }
    throw new Error('Invalid match type specified');
  } catch (error) {
    console.error('Error drawing matches:', error);
    throw error;
  }
};

// Function to create league matches (round-robin)
const createLeagueMatches = async (eventId, players, umpires) => {
  const matches = [];
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      matches.push({
        event: eventId,
        player1: players[i],
        player2: players[j],
        umpire: umpires[Math.floor(Math.random() * umpires.length)] || null, // Assign random umpire or leave null
      });
    }
  }
  return matches;
};

// Function to create knockout matches (bracket-style)
const createKnockoutMatches = async (eventId, players, umpires) => {
  const shuffledPlayers = [...players].sort(() => Math.random() - 0.5); // Shuffle players for randomness
  const matches = [];

  // Create initial matches (first round)
  for (let i = 0; i < shuffledPlayers.length; i += 2) {
    if (i + 1 < shuffledPlayers.length) {
      matches.push({
        event: eventId,
        player1: shuffledPlayers[i],
        player2: shuffledPlayers[i + 1],
        umpire: umpires[Math.floor(Math.random() * umpires.length)] || null, // Assign random umpire or leave null
      });
    }
  }
  return matches;
};

// Export the controller function for use in routes
export default { createEvent };
