import { useContext, useEffect } from "react";
import { StoreContext } from "../store/StoreProvider";

import Select from "react-select";

const FlexSearch = () => {
  const {
    displayFilteredPhotos,
    filteredWord,
    photosCache,
    setPhotos,
    setThemeFilters,
    themes,
    themeFilters,
  } = useContext(StoreContext);

  const selectOptions = themes.map((theme) => ({
    label: theme.themeName,
    value: theme.themeName,
  }));

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
