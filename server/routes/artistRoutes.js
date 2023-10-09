import express from "express";
import axios from "axios";

const router = express.Router();

//Get MOM info from spotify
//01rN7IQbgfwlpj6rMPOIyB?si=xBaPlAz9ToaKBTsp9pYFcA
router.get("/artists/:artistId", async (req, res) => {
  const token = process.env.SPOTIFY_ACCESS_TOKEN || null;
  const artistId = req.params.artistId;
  console.log(token);

  if (token === null) {
    return res.status(401).send("Unathorized access token");
  }

  try {
    const artistInfo = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //Handle response
    res.json(artistInfo.data);
  } catch (error) {
    res.status(400).send("Error " + error.message);
  }
});

export default router;
