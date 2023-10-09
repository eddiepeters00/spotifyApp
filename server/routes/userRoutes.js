import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.get("/account/me", async (req, res) => {
  const token = process.env.SPOTIFY_ACCESS_TOKEN || null;
  if (token === null) {
    return res.status(401).send("Unathorized access token");
  }

  try {
    const userInfo = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //Handle response
    res.json(userInfo.data);
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

export default router;
