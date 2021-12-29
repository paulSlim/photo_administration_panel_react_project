import { useState, useContext, useEffect } from "react";

// import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";
import request from "../helpers/request";

import Modal from "./Modal";
import ThemeElement from "./ThemeElement";
import ValidationMessage from "./ValidationMessage";

import style from "./LoginForm.module.scss";

// const style = bemCssModules(LoginFormStyles);

const AddEditTheme: React.FC = () => {
  const [themeName, setThemeName] = useState<string>("");

  const {
    fetchPhotoData,
    fetchThemesData,
    handleClose,
    isModalActive,
    setValidation,
    themes,
  } = useContext(StoreContext);

  const handleAddTheme = async (e): Promise<void> => {
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
    <ThemeElement key={theme.id} id={theme.id} themeName={theme.themeName} />
  ));

  useEffect(() => {
    if (isModalActive) {
      setThemeName("");
      setValidation("");
    }
  }, [isModalActive]);

  return (
    <Modal
      outsideClick={true}
      isModalActive={isModalActive}
      handleClose={handleClose}
    >
      <div className={style["login-form"]}>
        <ValidationMessage />
        <h3>Lista tematów</h3>
        <ul>{themesList}</ul>
        <br />
        <h3>Dodaj temat</h3>
        <form method="post" onSubmit={handleAddTheme}>
          <div className={style["login-form__login-input"]}>
            <label>
              Nazwa tematu
              <input
                type="text"
                onChange={(e) => setThemeName(e.target.value)}
                value={themeName}
              />
            </label>
          </div>
          <div className={style["login-form__login-input"]}>
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
