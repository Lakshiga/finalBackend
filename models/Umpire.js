import mongoose from 'mongoose';

const { Schema } = mongoose;

const umpireSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    certificationLevel: {
        type: String,
        required: true,
    },
    verificationStatus: {
        type: String,
        enum: ['Pending', 'Verified'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Umpire = mongoose.model('Umpire', umpireSchema);
export default Umpire; // Use default export
