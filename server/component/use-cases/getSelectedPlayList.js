export default function createGetSelectedPlayList({ axios }) {
  return Object.freeze({ getSelectedPlayList });

  async function getSelectedPlayList({ accessToken, playListId }) {
    try {
      console.log("[USE-CASES][GET-SELECTED-PLAYLIST] - START");
      console.log(
        "[USE-CASES][GET-SELECTED-PLAYLIST]:",
        accessToken,
        playListId
      );
      if (!accessToken) {
        throw new Error("Unvalid access-token!");
      } else {
        const playListData = await axios.get(
          `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("[USE-CASES][GET-SELECTED-PLAYLIST] - END");
        return playListData.data;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
