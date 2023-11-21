import axios from "axios";
import querystring from "querystring";
import config from "../../config/index.js";
import generateRandomString from "../../helpers/randomstring.js";
import createAuth from "./auth.js";
import createSpotifyCallback from "./spotify_callback.js";
import createGetUserData from "./getUserData.js";
import createGetUserPlayLists from "./getUserPlaylists.js";
import createGetSelectedPlayList from "./getSelectedPlayList.js";
import createNewPlayList from "./newPlayList.js";

const clientId = config.SPOTIFY_CLIENT_ID;
const clientSecret = config.SPOTIFY_CLIENT_SECRET;
const redirectUri = config.SPOTIFY_REDIRECT_URI;
const scope = config.SPOTIFY_SCOPE;

const authSpotify = () => {
  return createAuth({ querystring }).auth({
    clientId,
    scope,
    redirectUri,
    generateRandomString,
  });
};

const spotifyCallback = async (code, state) => {
  return createSpotifyCallback({ axios, querystring }).spotifyCallback({
    code,
    state,
    redirectUri,
    clientId,
    clientSecret,
  });
};

const getUserData = (accessToken) => {
  return createGetUserData({ axios }).getUserData({ accessToken });
};

const getUserPlayLists = (accessToken, userId) => {
  return createGetUserPlayLists({ axios }).getUserPlayLists(
    accessToken,
    userId
  );
};

const getSelectedPlayList = (accessToken, playListId) => {
  return createGetSelectedPlayList({ axios }).getSelectedPlayList({
    accessToken,
    playListId,
  });
};

const newPlayList = (accessToken) => {
  return createNewPlayList({}).newPlayList({
    accessToken,
  });
};

export {
  authSpotify,
  spotifyCallback,
  getUserData,
  getUserPlayLists,
  getSelectedPlayList,
  newPlayList,
};
