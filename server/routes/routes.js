import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import querystring from "querystring";
import randomstring from "randomstring";

dotenv.config();
const router = express.Router();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = "http://localhost:3000/callback";

router.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

//Request authorization to access data
router.get("/login", (req, res) => {
  const state = randomstring.generate(16);
  const scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
      })
  );
});

router.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      params: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          clientId + ":" + clientSecret
        ).toString("base64")}`,
      },
    };

    try {
      const response = await axios(authOptions);
      //Save token as .env variable
      process.env.SPOTIFY_ACCESS_TOKEN = response.data.access_token;
      res.send("Authentication successfull");
    } catch (error) {
      // Handle errors
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
});

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
