import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChosenPlayList = () => {
  const { id } = useParams();
  const [playlist, setPlayList] = useState("");
  useEffect(() => {
    try {
      fetch(`http://localhost:3000/api/playlists/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPlayList(data);
          console.log(data);
        });
    } catch (error) {
      console.error(error);
    }
  }, [id]);
  return (
    <>
      {typeof playlist !== "undefined" ? <p>{playlist.name}</p> : <p>ERROR</p>}
    </>
  );
};

export default ChosenPlayList;
