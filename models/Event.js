import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema({
  name: { type: String, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  matchType: { type: String, enum: ['League', 'Knockout'], required: true },
  players: [{ type: String, required: true }],
  umpires: [{ type: String, required: true }],
  matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Event', EventSchema);
