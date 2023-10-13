import "../index.css";
const PlayListBox = ({ name, images, id }) => {
  return (
    <div className="playlist-box">
      <img src={images[0].url} alt="Playlist"></img>
      <div>
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default PlayListBox;
