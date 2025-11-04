import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 1, max: 10 },
    note: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Mood', moodSchema);
