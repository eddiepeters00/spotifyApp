const selectedPlayListView = ({ name, image, tracks }) => {
  return (
    <>
      <div>
        <img>{image}</img>
        <h3>{name}</h3>
      </div>
    </>
  );
};

export default selectedPlayListView;
