import express from "express";
import getUserPlayLists from "./userHandler.js";
const router = express.Router();

router.get("/me/playlists", async (req, res) => {
  try {
    const userPlayLists = await getUserPlayLists(req, res);
    res.json(userPlayLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
