import React, { useState } from "react";
import FilterForm from "./FilterForm";

const PlayListButtonsField = ({ tracks, callback }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="playlist-buttons-container">
        <a href="/home">Back</a>
        <button onClick={handleClick}>Filter playlist</button>
      </div>
      <div className={`filter-dropdown ${isDropdownOpen ? "open" : "closed"}`}>
        <FilterForm callback={callback} tracks={tracks} />
      </div>
    </>
  );
};

export default PlayListButtonsField;
