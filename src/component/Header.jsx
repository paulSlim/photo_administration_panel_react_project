import React, { useContext } from "react";

import bemCssModules from "bem-css-modules";
import { default as HeaderStyles } from "./Header.module.scss";
import { StoreContext } from "../store/StoreProvider";

import AddPhoto from "./AddPhoto";
import AddEditTheme from "./AddEditTheme";
import DisplayPhoto from "./DisplayPhoto";
import LoginForm from "./LoginForm";

const style = bemCssModules(HeaderStyles);

const Header = () => {
  const { handleOnClickLogin, modalContent, setEditMode, user } = useContext(
    StoreContext
  );

  const isUserLogged = user ? "Wyloguj się" : "Zaloguj się";

  const handleAddPhoto = () => {
    setEditMode(false);
    handleOnClickLogin("isAddPhotoActive");
  };

  return (
    <header className={style()}>
      <h1 className={style("title")}>Panel administracyjny</h1>
      <div className={style("btn-container")}>
        <button onClick={handleAddPhoto} className={style("fn-btn")}>
          Dodaj zdjęcie
        </button>
        <button
          onClick={() => handleOnClickLogin("isAddEditThemeActive")}
          className={style("fn-btn")}
        >
          Tematy
        </button>
        <button
          onClick={() => handleOnClickLogin("isLoginFormActive")}
          className={style("fn-btn")}
        >
          {isUserLogged}
        </button>
      </div>
      {modalContent.isAddPhotoActive && <AddPhoto />}
      {modalContent.isAddEditThemeActive && <AddEditTheme />}
      {modalContent.isDisplayPhotoActive && <DisplayPhoto />}
      {modalContent.isLoginFormActive && <LoginForm />}
    </header>
  );
};

export default Header;
