export default function createSpotifyCallback({ axios, querystring }) {
  return Object.freeze({ spotifyCallback });

  async function spotifyCallback({
    code,
    state,
    redirectUri,
    clientId,
    clientSecret,
  }) {
    try {
      console.log("[USE-CASE][SPOTIFY CALLBACK] - START");
      let tokenResponse = null;
      if (state !== null) {
        const authOptions = {
          url: "https://accounts.spotify.com/api/token",
          method: "post",
          data: querystring.stringify({
            code: code,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
          }),
          headers: {
            Authorization: `Basic ${Buffer.from(
              clientId + ":" + clientSecret
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };

        tokenResponse = await axios(authOptions);
      }

      console.log("[USE-CASE][SPOTIFY CALLBACK] - END");
      return tokenResponse;
    } catch (error) {
      console.error(error);
    }
  }
}
