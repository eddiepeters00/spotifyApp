import "../index.css";
const PlayListBox = ({ name, images, id, onPlaylistClick }) => {
  const handleClick = () => {
    onPlaylistClick(id);
  };

  return (
    <div className="playlist-box" onClick={handleClick}>
      <img src={images[0].url} alt="Playlist"></img>
      <div>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default PlayListBox;
