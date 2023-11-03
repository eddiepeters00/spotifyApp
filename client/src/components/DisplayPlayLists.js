import useFetch from "../hooks/useFetch";
import PlayListBox from "./PlayListBox";

const DisplayPlayLists = () => {
  const {
    data: playLists,
    isPending,
    error,
  } = useFetch("http://localhost:3000/api/user/playlists");

  if (isPending) {
    return <p> Loading... </p>;
  }

  if (error) {
    return <p>Error...</p>;
  }

  return (
    <>
      <section className="container">
        <h3>Playlists</h3>
        <div>
          {playLists.playlists.map((playlist, i) => (
            <PlayListBox
              key={i}
              name={playlist.name}
              images={playlist.images}
              id={playlist.id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default DisplayPlayLists;
