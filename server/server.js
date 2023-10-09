import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import querystring from "querystring";
import randomstring from "randomstring";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = "http://localhost:3000/callback";

//Request authorization to access data
app.get("/login", (req, res) => {
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

app.get("/callback", async (req, res) => {
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
      const token = response.data.access_token;
      // Handle the token as needed
      res.send(`Token: ${token}`);
    } catch (error) {
      // Handle errors
      console.error("Error:", error.message);
      res.status(500).send("Internal Server Error");
    }
  }
});

//Get MOM artist info from spotify
//https://open.spotify.com/artist/01rN7IQbgfwlpj6rMPOIyB?si=xBaPlAz9ToaKBTsp9pYFcA
app.get("/artists/{IUIYIVvbQ86PnuECM-tFCA}", (req, res) => {
  res.send(req.href);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
