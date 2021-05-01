import React, { useState, useRef } from "react";
import bemCssModules from "bem-css-modules";
import request from "../helpers/request";

const ThemeElement = ({
  id,
  themeName,
  handleUpdateThemes,
  fetchThemesData,
}) => {
  const [editThemeMode, setEditThemeMode] = useState(false);

  const themeRef = useRef("");

  const handleThemeEdit = () => {
    setEditThemeMode((prevValue) => !prevValue);
  };

  const handleUpdateTheme = async () => {
    const themeName = themeRef.current.value;
    console.log(themeName);
    const { data, status } = await request.put("/themes", { id, themeName });
    if (status === 202) {
      fetchThemesData();
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
