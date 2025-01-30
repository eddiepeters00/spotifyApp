import {
  authSpotify,
  spotifyCallback,
  getUserData,
  getUserPlayLists,
  getSelectedPlayList,
  newPlayList,
} from "../use-cases/index.js";

const baseUrl = "/api";

const authSpotifyEP = async (req, res) => {
  try {
    const authorizationUrl = await authSpotify();
    res.redirect(authorizationUrl);
  } catch (error) {
    res.status(403).json({ data: error.message });
  }
};

const spotifyCallbackEP = async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  try {
    const tokenResponse = await spotifyCallback(code, state);
    req.session.accessToken = tokenResponse.data.access_token;
    res.redirect("http://localhost:3000/home");
  } catch (error) {
    res.status(403).json({ data: error.message });
  }
};

const getUserDataEP = async (req, res) => {
  try {
    const userData = await getUserData(req.session.accessToken);
    req.session.user = userData;
    return res.json({ data: userData });
  } catch (err) {
    res.json({ error: err });
  }
};

const getUserPlayListsEP = async (req, res) => {
  try {
    if (!req.session.user) {
      console.log("[CONTROLLER][GETUSERPLAYLISTEP] - Fetching user data");
      const userData = await getUserData(req.session.accessToken);
      req.session.user = userData;
    }

    const userPlayLists = await getUserPlayLists(
      req.session.accessToken,
      req.session.user.id
    );

    res.json({ playlists: userPlayLists });
  } catch (err) {
    res.json({ error: err });
  }
};

const getSelectedPlayListEP = async (req, res) => {
  try {
    if (req.session && req.params["id"]) {
      console.log(
        `Session: ${req.session.accessToken}, Param: ${req.params["id"]}`
      );
      const selectedPlayList = await getSelectedPlayList(
        req.session.accessToken,
        req.params["id"]
      );

      res.json({ playlist: selectedPlayList });
    }
  } catch (err) {
    res.json({ error: err });
  }
};

const newPlayListEP = async (req, res) => {
  try {
    if (req.session.accessToken) {
      const newPlayList = await newPlayList(req.session.accessToken);
      console.log("[Controller][INDEX] Creating new playlist");
      console.log(req);
      return res.json({ playList: newPlayList });
    }
  } catch (err) {
    res.json({ error: err });
  }
};

const routes = [
  { path: `${baseUrl}/auth`, method: "get", component: authSpotifyEP },
  { path: `${baseUrl}/callback`, method: "get", component: spotifyCallbackEP },
  { path: `${baseUrl}/user`, method: "get", component: getUserDataEP },
  {
    path: `${baseUrl}/user/playlists`,
    method: "get",
    component: getUserPlayListsEP,
  },
  {
    path: `${baseUrl}/user/playlists/:id`,
    method: "get",
    component: getSelectedPlayListEP,
  },
  { path: `${baseUrl}/create`, method: "post", component: newPlayListEP },
];

export { routes };
