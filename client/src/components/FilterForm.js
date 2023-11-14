import { useState } from "react";

const FilterForm = ({ tracks, callback }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => setIsChecked(!isChecked);

  //Creates an array of unique artists
  const getUniqueArtists = () => [
    ...new Set(tracks.map((track) => track.track.artists[0].name)),
  ];

  //Creates an array of unique album names
  const getUniqueAlbum = () => [
    ...new Set(tracks.map((track) => track.track.album.name)),
  ];

  //Get the selected filters from the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputObj = {};
    for (const node of e.target) {
      if (node.name != null && node.name !== "undefined" && node.value !== "") {
        inputObj[node.name] = node.value;
      }
    }

    const filteredTracks = filterTracks(inputObj);

    //Send data back to SelectedPlayList component
    callback(filteredTracks);
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

    if (filters.explicit === "true") {
      filteredTracks = filteredTracks.filter(
        (track) => Boolean(filters.explicit) === track.track.explicit
      );
    }

    return filteredTracks;
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="artist-select">Artist:</label>
        <div className="input-wrapper">
          <select name="artist" id="artist-select">
            <option></option>
            {getUniqueArtists().map((artist, index) => (
              <option key={index} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="album-select">Album:</label>
        <div className="input-wrapper">
          <select name="album" id="album-select">
            <option></option>
            {getUniqueAlbum().map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label>Duration</label>
        <div className="input-wrapper">
          <input
            placeholder="1 (minutes)"
            name="min_duration"
            type="number"
          ></input>
          <input
            placeholder="5 (minutes)"
            name="max_duration"
            type="number"
          ></input>
        </div>
      </div>

      <div className="toggle-wrapper">
        <label className="toggle" htmlfor="toggle-explicit">
          Explicit only:
          <input
            id="toggle-explicit"
            onClick={handleClick}
            name="explicit"
            type="checkbox"
            value={isChecked}
          ></input>
          <div className="toggle-fill"></div>
        </label>
      </div>

      <button>Filter</button>
    </form>
  );
};

export default FilterForm;
