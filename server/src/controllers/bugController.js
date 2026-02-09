import Bug from "../models/Bug.js";

export const createBug = async (req, res) => {
  const bug = await Bug.create(req.body);
  res.status(201).json(bug);
};

export const getBugs = async (req, res) => {
  const bugs = await Bug.find();
  res.json(bugs);
};

export const updateBug = async (req, res) => {
  const bug = await Bug.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(bug);
};

export const deleteBug = async (req, res) => {
  await Bug.findByIdAndDelete(req.params.id);
  res.json({ message: "Bug deleted" });
};
