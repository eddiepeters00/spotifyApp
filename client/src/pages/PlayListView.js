import { useState, useEffect } from "react";
import PlayListBox from "../components/PlayListBox";

const PlayListView = () => {
  const [playLists, setPlayLists] = useState("");
  useEffect(() => {
    try {
      fetch("http://localhost:3000/api/playlists")
        .then((res) => res.json())
        .then((data) => setPlayLists(data.items));
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <>
      <h2>Here are your playlists from spotify!</h2>
      <p>Choose which one you want to sort</p>
      {playLists.length > 0 ? (
        <section>
          {playLists.map((playlist, i) => (
            <PlayListBox
              key={i}
              name={playlist.name}
              images={playlist.images}
              id={playlist.id}
            />
          ))}
        </section>
      ) : (
        <p>Could not find playlists</p>
      )}
    </>
  );
};

export default PlayListView;
