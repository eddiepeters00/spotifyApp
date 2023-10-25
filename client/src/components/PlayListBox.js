import "../index.css";
const PlayListBox = ({ name, images, id, onPlaylistClick }) => {
  const handleClick = () => {
    onPlaylistClick(id);
  };

  return (
    <section className="playlist-box">
      <div>
        <img src={images[0].url} alt="Playlist"></img>
        <p>{name}</p>
      </div>
      <div>
        <button>SORT</button>
      </div>
    </section>
  );
};

export default PlayListBox;
