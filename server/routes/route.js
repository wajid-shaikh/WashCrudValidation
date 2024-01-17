const express = require("express");
require("../db/conn");
const Actor = require("../models/actorSchema");
const router = express.Router();

// Create API
router.post("/create", async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const actor = new Actor({ name, email, contact });

    await actor.save();
    res
      .status(201)
      .json({ message: "Actor created successfully", data: actor });
  } catch (error) {
    console.error("Error creating Actor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  res.send("Hi project deployed successfully");
});

// Read All API
router.get("/getallactors", async (req, res) => {
  try {
    const actors = await Actor.find().select("-__v");
    res.json({ data: actors });
  } catch (error) {
    console.error("Error getting Actors:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete All API
router.delete("/deleteactor/:id", async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id).select("-__v");
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }
    res.json({ message: "Actor deleted successfully", data: actor });
  } catch (error) {
    console.error("Error deleting Actor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Read Single API
router.get("/read/:id", async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id).select("-__v");
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }
    res.json({ data: actor });
  } catch (error) {
    console.error("Error getting Actor by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Single API
router.put("/update/:id", async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const actor = await Actor.findByIdAndUpdate(
      req.params.id,
      { name, email, contact },
      { new: true }
    ).select("-__v");
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }
    res.json({ message: "Actor updated successfully", data: actor });
  } catch (error) {
    console.error("Error updating Actor:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
