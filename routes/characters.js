import { Router } from 'express';
const router = Router();
import Character from '../models/character';

// GET characters with pagination
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const characters = await Character.find()
      .sort({ createdAt: -1 })
      .skip(skipIndex)
      .limit(limit);

    res.json(characters);
  } catch (err) {
    next(err);
  }
});

// GET character using name
router.get('/name/:name', async (req, res, next) => {
  try {
    const character = await Character.findOne({ name: req.params.name });
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (err) {
    next(err);
  }
});

// GET a character using email
router.get('/email/:email', async (req, res, next) => {
  try {
    const character = await Character.findOne({ email: req.params.email });
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (err) {
    next(err);
  }
});

// POST new character
router.post('/', async (req, res, next) => {
  try {
    const character = new Character(req.body);
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch (err) {
    next(err);
  }
});

// PUT update character by ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedCharacter = await Character.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCharacter);
  } catch (err) {
    next(err);
  }
});

// PUT update a character by email
router.put('/email/:email', async (req, res, next) => {
  try {
    const updatedCharacter = await Character.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!updatedCharacter) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(updatedCharacter);
  } catch (err) {
    next(err);
  }
});

// DELETE a character by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedCharacter = await Character.findByIdAndDelete(req.params.id);
    res.json(deletedCharacter);
  } catch (err) {
    next(err);
  }
});

export default router;
