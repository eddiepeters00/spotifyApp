import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import querystring from "querystring";
import randomString from "../assets/randomstring.js";

dotenv.config();
const router = express.Router();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = "http://localhost:3000/callback";

//Request authorization to access data
router.get("/api/login", (req, res) => {
  const state = randomString(16);
  const scope = "user-read-private user-read-email playlist-read-private";

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

export default router;
