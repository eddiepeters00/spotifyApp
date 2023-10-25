export default function createAuth({ querystring }) {
  return Object.freeze({ auth });

  async function auth({ clientId, scope, redirectUri, generateRandomString }) {
    try {
      console.log("[USE-CASE][AUTH] -  START");

      const spotifyAuthUrl =
        `https://accounts.spotify.com/authorize?` +
        querystring.stringify({
          response_type: "code",
          client_id: clientId,
          scope: scope,
          redirect_uri: redirectUri,
          state: generateRandomString(16),
        });

      console.log("[USE-CASE][AUTH] -  END");
      return spotifyAuthUrl;
    } catch (error) {
      console.error(error);
    }
  }
}
