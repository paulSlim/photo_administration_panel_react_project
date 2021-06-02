import React, { useContext } from "react";

import bemCssModules from "bem-css-modules";
import { default as HeaderStyles } from "./Header.module.scss";
import { StoreContext } from "../store/StoreProvider";

import AddEditPhoto from "./AddEditPhoto";
import AddEditTheme from "./AddEditTheme";
import DisplayPhoto from "./DisplayPhoto";
import LoginForm from "./LoginForm";

const style = bemCssModules(HeaderStyles);

const Header = () => {
  const { handleModalContent, modalContent, setEditMode, user } = useContext(
    StoreContext
  );

  const isUserLogged = user ? "Wyloguj się" : "Zaloguj się";

  const handleAddEditPhoto = () => {
    setEditMode(false);
    handleModalContent("isAddEditPhotoActive"); //
  };

  return (
    <header className={style()}>
      <h1 className={style("title")}>Panel administracyjny</h1>
      <div className={style("btn-container")}>
        <button onClick={handleAddEditPhoto} className={style("fn-btn")}>
          Dodaj zdjęcie
        </button>
        <button
          onClick={() => handleModalContent("isAddEditThemeActive")}
          className={style("fn-btn")}
        >
          Tematy
        </button>
        <button
          onClick={() => handleModalContent("isLoginFormActive")}
          className={style("fn-btn")}
        >
          {isUserLogged}
        </button>
      </div>
      {modalContent.isAddEditPhotoActive && <AddEditPhoto />}
      {modalContent.isAddEditThemeActive && <AddEditTheme />}
      {modalContent.isDisplayPhotoActive && <DisplayPhoto />}
      {modalContent.isLoginFormActive && <LoginForm />}
    </header>
  );
};

export default Header;
