/*TODO:
//Fetch artists and bpm
//map artists genres
filter on genres and bpm
*/

const FilterForm = ({ tracks }) => {
  //Get all the unique artists from the tracks
  const getUniqueArtists = () => [
    ...new Set(tracks.map((track) => track.track.artists[0].name)),
  ];

  const getUniqueGenres = () => [];

  //Get the selected filters from the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputObj = {};
    for (const node of e.target) {
      if (node.name != null && node.name !== "undefined" && node.value !== "") {
        inputObj[node.name] = node.value;
      }
    }

    filterTracks(inputObj);
  };

  //Filter tracks with inputs from the form
  const filterTracks = (filters) => {
    let filteredTracks = [...tracks];

    if (filters.artist) {
      filteredTracks = filteredTracks.filter(
        (track) => track.track.artists[0].name === filters.artist
      );
    }

    if (filters.min_duration && filters.max_duration) {
      filteredTracks = filteredTracks.filter(
        (track) =>
          Number(filters.min_duration) * 60 * 1000 <= track.track.duration_ms &&
          Number(filters.max_duration) * 60 * 1000 >= track.track.duration_ms
      );
    }

    console.log(filteredTracks);
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div>
        <label>Genre:</label>
        <select name="genre" id="genre-select">
          {getUniqueGenres().map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Artist:</label>
        <select name="artist" id="artist-select">
          <option></option>
          {getUniqueArtists().map((artist, index) => (
            <option key={index} value={artist}>
              {artist}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Duration</label>
        <input name="min_duration" type="number"></input>
        <input name="max_duration" type="number"></input>
      </div>

      <div>
        <label>BPM:</label>
        <input name="min_bpm" type="number"></input>
        <input name="max_bpm" type="number"></input>
      </div>

      <button>Filter</button>
    </form>
  );
};

export default FilterForm;
