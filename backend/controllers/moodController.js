import Mood from '../models/Mood.js';

export const createMood = async (req, res, next) => {
  try {
    const { score, note } = req.body;
    const mood = await Mood.create({ user: req.userId, score, note });
    res.status(201).json({ mood });
  } catch (err) {
    next(err);
  }
};

export const getMoods = async (req, res, next) => {
  try {
    const moods = await Mood.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ moods });
  } catch (err) {
    next(err);
  }
};

export const deleteMood = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Mood.deleteOne({ _id: id, user: req.userId });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
