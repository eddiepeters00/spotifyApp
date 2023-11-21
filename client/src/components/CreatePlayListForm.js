const CreatePlayListForm = ({ playListCB }) => {
  //Get input from form
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputObj = {};
    for (const node of e.target) {
      if (node.name != null && node.name !== "undefined" && node.value !== "") {
        inputObj[node.name] = node.value;
      }
    }

    //Send data back to SelectedPlayList component
    playListCB(inputObj);
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <p>Create a new playlist containing the tracks below.</p>
      <div>
        <label htmlFor="name">Playlist name:</label>
        <div className="input-wrapper">
          <input name="name" type="text"></input>
        </div>
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <div className="input-wrapper">
          <input name="description" type="text"></input>
        </div>
      </div>
      <button>Create playlist</button>
    </form>
  );
};
export default CreatePlayListForm;
