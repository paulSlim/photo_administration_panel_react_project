import { useState, useContext, useEffect } from "react";

import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";
import request from "../helpers/request";

import Modal from "./Modal";
import ThemeElement from "./ThemeElement";

import { default as LoginFormStyles } from "./LoginForm.module.scss";

const style = bemCssModules(LoginFormStyles);

const AddEditTheme = () => {
  const [themeName, setThemeName] = useState("");

  const {
    fetchPhotoData,
    fetchThemesData,
    handleClose,
    isModalActive,
    setValidation,
    themes,
    validation,
  } = useContext(StoreContext);

  const handleAddTheme = async (e) => {
    e.preventDefault();
    const { data, status } = await request.post("/themes", { themeName });
    if (status === 201) {
      fetchThemesData();
      setThemeName("");
    } else setValidation(data.message);
  };

  const validationElement = validation.length ? (
    <span className={style("validation")}>{validation}</span>
  ) : null;

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
      fetchPhotoData={fetchPhotoData}
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
        {validationElement}
        <h3>Lista tematów</h3>
        <ul>{themesList}</ul>
        <br />
        <h3>Dodaj temat</h3>
        <form method="post" onSubmit={handleAddTheme}>
          <div className={style("login-input")}>
            <label>
              Nazwa tematu
              <input
                type="text"
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
