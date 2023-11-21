import React, { useState } from "react";
import FilterForm from "./FilterForm";
import CreatePlayListForm from "./CreatePlayListForm";

const PlayListButtonsField = ({ tracks, filterCB, playlistCB }) => {
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const handleClickCreate = () => {
    setIsCreateDropdownOpen(!isCreateDropdownOpen);
  };

  const handleClickFilter = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  return (
    <>
      <div className="playlist-buttons-container">
        <a href="/home">Back</a>
        <button onClick={handleClickCreate}>Create new playlist</button>
        <button onClick={handleClickFilter}>Filter playlist</button>
      </div>
      <div
        className={`filter-dropdown ${
          isCreateDropdownOpen ? "open" : "closed"
        }`}
      >
        <CreatePlayListForm playListCB={playlistCB} />
      </div>

      <div
        className={`filter-dropdown ${
          isFilterDropdownOpen ? "open" : "closed"
        }`}
      >
        <FilterForm filterCB={filterCB} tracks={tracks} />
      </div>
    </>
  );
};

export default PlayListButtonsField;
