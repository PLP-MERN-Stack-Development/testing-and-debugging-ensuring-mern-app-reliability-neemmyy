import express from "express";
import Bug from "../models/Bug.js";

const router = express.Router();

/**
 * @route   POST /api/bugs
 * @desc    Create a new bug
 */
router.post("/", async (req, res) => {
  try {
    const bug = new Bug({
      title: req.body.title,
      description: req.body.description,
    });

    const savedBug = await bug.save();
    res.status(201).json(savedBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * @route   GET /api/bugs
 * @desc    Get all bugs
 */
router.get("/", async (req, res) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @route   PATCH /api/bugs/:id/status
 * @desc    Update bug status (open / closed)
 */
router.patch("/:id/status", async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!bug) {
      return res.status(404).json({ message: "Bug not found" });
    }

    res.json(bug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
