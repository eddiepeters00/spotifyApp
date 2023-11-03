import React from "react";
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const SelectedPlayList = () => {
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

  // data.playlist.items.forEach((track) => {
  //   console.log(track.track.id);
  // });

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
      <div>sort buttons</div>
      <section className="track-list-container">
        <ul>
          {data.playlist.items.map((track, i) => (
            <li key={i}>{track.track.name}</li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default SelectedPlayList;
