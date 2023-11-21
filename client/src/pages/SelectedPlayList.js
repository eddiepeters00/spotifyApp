import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PlayListButtonsField from "../components/PlayListButtonsField";
import createNewPlayList from "../libs/createNewPlayList";

const SelectedPlayList = () => {
  const [filteredPlaylist, setFilteredPlaylist] = useState(null);
  const [newPlayList, setNewPlayList] = useState(null);
  const { id } = useParams();
  const { state } = useLocation();
  const url = "http://localhost:3000/api/user/playlists/";

  const { data, isPending, error } = useFetch(url + id, {
    method: "GET",
    credentials: "include",
  });

  if (isPending) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  //Get filtered tracks from FilterForm
  const getFilteredPlayList = (filteredTracks) => {
    setFilteredPlaylist(filteredTracks);
  };

  const getNewPlaylistData = (newPlaylistData) => {
    setNewPlayList(newPlaylistData);
  };

  //Create new playlist with filtered tracks
  if (newPlayList && filteredPlaylist) {
    console.log(newPlayList);
    console.log(filteredPlaylist);
    createNewPlayList(newPlayList, filteredPlaylist);
  }

  return (
    <section className="playlist-view">
      <section className="playlist-info">
        {state ? (
          <div>
            <img src={state.images[0].url} alt={state.name} />
            <p>{state.name}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <PlayListButtonsField
        filterCB={getFilteredPlayList}
        playlistCB={getNewPlaylistData}
        tracks={data.playlist.items}
      />
      <section className="track-list-container">
        <ul>
          {filteredPlaylist
            ? filteredPlaylist.map((track, i) => (
                <li key={i}>
                  <img
                    src={track.track.album.images[0].url}
                    alt="album cover"
                  ></img>
                  <div>
                    <p>{track.track.name}</p>
                    <p>{track.track.artists[0].name}</p>
                  </div>
                </li>
              ))
            : data.playlist.items.map((track, i) => (
                <li key={i}>
                  <img
                    src={track.track.album.images[0].url}
                    alt="album cover"
                  ></img>
                  <div>
                    <p>{track.track.name}</p>
                    <p>{track.track.artists[0].name}</p>
                  </div>
                </li>
              ))}
        </ul>
      </section>
    </section>
  );
};

export default SelectedPlayList;
