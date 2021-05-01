import React, { useState, useContext, useEffect } from "react";

import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";
import request from "../helpers/request";

import Modal from "./Modal";
import ThemeElement from "./ThemeElement";

import { default as LoginFormStyles } from "./LoginForm.module.scss";

const style = bemCssModules(LoginFormStyles);

const AddEditTheme = () => {
  const [themeName, setThemeName] = useState("");

  const { fetchThemesData, handleClose, isModalActive, themes } = useContext(
    StoreContext
  );

  const handleAddTheme = async (e) => {
    e.preventDefault();
    const { data, status } = await request.post("/themes", { themeName });
    if (status === 201) {
      fetchThemesData();
      setThemeName("");
    } else setValidation(data.message);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    handleClose();
    setThemeName("");
  };

  const themesList = themes.map((theme) => (
    <ThemeElement
      className={style("theme-element")}
      key={theme.id}
      id={theme.id}
      themeName={theme.themeName}
      fetchThemesData={fetchThemesData}
    />
  ));

  useEffect(() => {
    if (isModalActive) {
      setThemeName("");
    }
  }, [isModalActive]);

  return (
    <Modal
      outsideClick={true}
      isModalActive={isModalActive}
      handleClose={handleClose}
    >
      <div className={style()}>
        <h4>Lista tematów</h4>
        <ul>{themesList}</ul>
        <h4>Dodaj temat</h4>
        <form method="post" onSubmit={handleAddTheme}>
          <div className={style("login-input")}>
            <label>
              Nazwa tematu
              <input
                onChange={(e) => setThemeName(e.target.value)}
                value={themeName}
              />
            </label>
          </div>
          <div className={style("login-input")}>
            <button type="submit" disabled={!themeName}>
              Dodaj temat
            </button>
            <button onClick={handleCloseModal}>Anuluj</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddEditTheme;
