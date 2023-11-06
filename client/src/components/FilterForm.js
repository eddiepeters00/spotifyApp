const FilterForm = (tracks) => {
  //Get all the unique artists from the tracks

  const getUniqueArtists = () => [
    ...new Set(tracks.tracks.map((track) => track.track.artists[0].name)),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div>
        <label>Genre:</label>
        <select id="genre-select">
          <option>rock</option>
          <option>pop</option>
          <option>house</option>
          <option>country</option>
        </select>
      </div>

      <div>
        <label>Artist:</label>
        <select id="artist-select">
          {getUniqueArtists().map((artist, index) => (
            <option key={index} value={artist}>
              {artist}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Duration</label>
        <input type="number"></input>
        <input type="number"></input>
      </div>

      <div>
        <label>BPM:</label>
        <input type="number"></input>
        <input type="number"></input>
      </div>

      <button>Filter</button>
    </form>
  );
};

export default FilterForm;
