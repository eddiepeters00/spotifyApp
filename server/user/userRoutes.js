import express from "express";
import { getUserPlayLists, getSelectedPlayList } from "./userHandler.js";
const router = express.Router();

router.get("/api/playlists", async (req, res) => {
  try {
    const userPlayLists = await getUserPlayLists(req, res);
    res.json(userPlayLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/api/playlists/:playListId", async (req, res) => {
  try {
    const selectedPlayList = await getSelectedPlayList(
      req,
      res,
      req.params.playListId
    );
    res.json(selectedPlayList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
