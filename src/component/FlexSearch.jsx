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

  const {
    fetchPhotoData,
    filteredWord,
    photosCache,
    setPhotos,
    themes,
  } = useContext(StoreContext);

  const selectOptions = themes.map((theme) => ({
    label: theme.themeName,
    value: theme.themeName,
  }));

  const displayFilteredPhotos = () => {
    const filteredPhotos = photosCache;
    if (themeFilters.length > 0) {
      filteredPhotos = filteredPhotos.filter((photo) =>
        themeFilters.some((theme) => theme.label === photo.theme)
      );
    }

    if (filteredWord) {
      filteredPhotos = filteredPhotos.filter((photo) =>
        photo.keywords.some((word) => word.includes(filteredWord))
      );
    }
    setPhotos(filteredPhotos);
  };

  useEffect(() => {
    if (themeFilters.length > 0 || filteredWord) {
      displayFilteredPhotos();
    } else {
      setPhotos(photosCache);
    }
  }, [themeFilters, filteredWord]);

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
