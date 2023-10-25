export default function createGetUserPlayLists({ axios }) {
  return Object.freeze({ getUserPlayLists });

  async function getUserPlayLists(accessToken, userId) {
    try {
      console.log("[USE-CASES][GETUSERPLAYLISTS] - START");
      if (!accessToken && !userId) {
        throw new Error("Unvalid access-token or user-ID!");
      } else {
        const userPlayLists = await axios.get(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("[USE-CASES][GETUSERPLAYLISTS] - END");
        return userPlayLists.data.items;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
