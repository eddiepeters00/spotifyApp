import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChosenPlayList = () => {
  const [playlist, setPlayList] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getSelectedPlayList = async (id) => {
      console.log("GETSELECTEDPLAYLIST START");
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/playlists/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const playListData = await response.json();
        setPlayList(playListData.playlist);
      } catch (error) {
        console.error(error);
      }
    };
    getSelectedPlayList(id);
  }, [id]);

  return (
    <div>
      {playlist ? (
        <ul>
          {playlist.items.map((track, i) => (
            <li key={i}>{track.track.name}</li>
          ))}
        </ul>
      ) : (
        <p>ERROR</p>
      )}
    </div>
  );
};

export default ChosenPlayList;
