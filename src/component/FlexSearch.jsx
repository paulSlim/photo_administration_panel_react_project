import bemCssModules from "bem-css-modules";
import request from "../helpers/request";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/StoreProvider";

import Select from "react-select";
import makeAnimated from "react-select/animated";

// import { default as FlexSearchStyle } from "./FlexSearch.module.scss";

// const style = bemCssModules(FlexSearchStyle);

const FlexSearch = () => {
  const [themeFilters, setThemeFilters] = useState([]);

  const { fetchPhotoData, setPhotos, themes } = useContext(StoreContext);

  const selectOptions = themes.map((theme) => ({
    label: theme.themeName,
    value: theme.themeName,
  }));

  const fetchPhotoArray = async () => {
    const { data } = await request.get("/photos");
    return data.photos;
  };

  const displayFilteredPhotos = async () => {
    let filteredPhotos = await fetchPhotoArray();
    filteredPhotos = await filteredPhotos.filter((photo) => {
      return themeFilters.some((theme) => theme.label === photo.theme);
    });
    await setPhotos(filteredPhotos);
  };

  useEffect(() => {
    if (themeFilters.length > 0) {
      displayFilteredPhotos();
    }

    if (themeFilters.length <= 0) {
      fetchPhotoData();
    }
  }, [themeFilters]);

  return (
    <div>
      <Select
        onChange={setThemeFilters}
        placeholder="Ustaw filter..."
        options={selectOptions}
        isMulti
        isSearchable
        noOptionsMessage={() => "Brak tematów - dodaj temat"}
      />
    </div>
  );
};

export default FlexSearch;
