import axios from "axios";

//Get the users spotifyID
async function getUserData(req, res) {
  const token = process.env.SPOTIFY_ACCESS_TOKEN;
  if (token === null) throw new Error("Unathorized token");

  const userInfo = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  req.token = token;
  req.userId = userInfo.data.id;
}

//Get the users playlists
const getUserPlayLists = async (req, res) => {
  await getUserData(req, res);
  const userPlayLists = await axios.get(
    `https://api.spotify.com/v1/users/${req.userId}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${req.token}`,
      },
    }
  );

  return userPlayLists.data;
};

export default getUserPlayLists;
