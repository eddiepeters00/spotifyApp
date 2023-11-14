import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import PlayListButtonsField from "../components/PlayListButtonsField";

const SelectedPlayList = () => {
  const [filteredPlaylist, setFilteredPlaylist] = useState(null);
  const { id } = useParams();
  const { state } = useLocation();
  const url = "http://localhost:3000/api/user/playlists/";

  const { data, isPending, error } = useFetch(url + id, {
    method: "GET",
    credentials: "include",
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  //Get filtered tracks from FilterForm
  const getFilteredPlayList = (filteredTracks) => {
    setFilteredPlaylist(filteredTracks);
  };

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
        callback={getFilteredPlayList}
        tracks={data.playlist.items}
      />
      <section className="track-list-container">
        <ul>
          {filteredPlaylist
            ? filteredPlaylist.map((track, i) => (
                <li key={i}>
                  <img
                    src={track.track.album.images[0].url}
                    alt="album image"
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
                    alt="album image"
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
