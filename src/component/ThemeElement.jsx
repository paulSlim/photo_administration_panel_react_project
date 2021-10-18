import { useState, useRef, useContext } from "react";
import bemCssModules from "bem-css-modules";
import request from "../helpers/request";

import { StoreContext } from "../store/StoreProvider";

import { default as ThemeElementStyle } from "./ThemeElement.module.scss";

const style = bemCssModules(ThemeElementStyle);

const ThemeElement = ({ id, themeName }) => {
  const [editThemeMode, setEditThemeMode] = useState(false);

  const { fetchPhotoData, fetchThemesData, setValidation } = useContext(
    StoreContext
  );

  const oldThemeName = themeName;
  const themeRef = useRef("");

  const handleDeleteTheme = async () => {
    console.log("id", id);
    const { data, status } = await request.delete(`/themes/${id}`);
    if (status === 200) {
      fetchThemesData();
      fetchPhotoData();
    } else setValidation(data.message);
  };

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

  const defaultView = (
    <li className={style()} onDoubleClick={handleThemeEdit}>
      {themeName} <button onClick={handleDeleteTheme}>Usuń</button>
    </li>
  );

  const editView = (
    <li className={style()}>
      <input type="text" defaultValue={themeName} ref={themeRef} />
      <button onClick={handleUpdateTheme}>OK</button>
      <button onClick={handleThemeEdit}>X</button>
    </li>
  );

  return editThemeMode ? editView : defaultView;
};

export default ThemeElement;
