import React, { useState, useRef } from "react";
import bemCssModules from "bem-css-modules";
import request from "../helpers/request";

const ThemeElement = ({
  id,
  fetchPhotoData,
  fetchThemesData,
  handleUpdateThemes,
  themeName,
}) => {
  const [editThemeMode, setEditThemeMode] = useState(false);

  const oldThemeName = themeName;
  const themeRef = useRef("");

  const handleThemeEdit = () => {
    setEditThemeMode((prevValue) => !prevValue);
  };

  const handleUpdateTheme = async () => {
    const themeName = themeRef.current.value;
    console.log("old name:" + oldThemeName);
    console.log("new name:" + themeName);
    const { data, status } = await request.put("/themes", {
      id,
      oldThemeName,
      themeName,
    });
    if (status === 202) {
      fetchThemesData();
      fetchPhotoData();
      setEditThemeMode(false);
    } else setValidation(data.message);
  };

  const editView = (
    <li>
      <input type="text" defaultValue={themeName} ref={themeRef} />
      <button onClick={handleUpdateTheme}>OK</button>
      <button onClick={handleThemeEdit}>X</button>
    </li>
  );

  const defaultView = (
    <li onDoubleClick={handleThemeEdit}>
      {themeName} <button>Usuń</button>
    </li>
  );

  return editThemeMode ? editView : defaultView;
};

export default ThemeElement;
