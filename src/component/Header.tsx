import { useContext, useState } from "react";

// import bemCssModules from "bem-css-modules";
import style from "./Header.module.scss";
import { StoreContext } from "../store/StoreProvider";

import AddEditPhoto from "./AddEditPhoto";
import AddEditTheme from "./AddEditTheme";
import DisplayPhoto from "./DisplayPhoto";
import LoginForm from "./LoginForm";
import BulkOperationsPanel from "./BulkOperationsPanel";

// const style = bemCssModules(HeaderStyles);

const Header: React.FC = () => {
  const {
    handleModalContent,
    modalContent,
    setEditMode,
    setFilteredWord,
    user,
  } = useContext(StoreContext);

  const [showPanel, setShowPanel] = useState(false);

  const isUserLogged = user ? "Wyloguj się" : "Zaloguj się";

  const handleAddEditPhoto = (): void => {
    setEditMode(false);
    handleModalContent("isAddEditPhotoActive");
  };

  return (
    <header className={style.header}>
      <h1 className={style.header__title}>Panel Administracyjny</h1>
      <div className={style["header__btn-container"]}>
        <button onClick={handleAddEditPhoto}>Dodaj zdjęcie</button>
        <button onClick={() => handleModalContent("isAddEditThemeActive")}>
          Tematy
        </button>
        <input
          placeholder="słowa kluczowe"
          type="text"
          onChange={(e) => setFilteredWord(e.target.value.toLowerCase())}
        />
        <button onClick={() => handleModalContent("isLoginFormActive")}>
          {isUserLogged}
        </button>
        <button onClick={() => setShowPanel(!showPanel)}>
          Operacje masowe
        </button>
        {showPanel && <BulkOperationsPanel setShowPanel={setShowPanel} />}
      </div>
      {modalContent.isAddEditPhotoActive && <AddEditPhoto />}
      {modalContent.isAddEditThemeActive && <AddEditTheme />}
      {modalContent.isDisplayPhotoActive && <DisplayPhoto />}
      {modalContent.isLoginFormActive && <LoginForm />}
    </header>
  );
};

export default Header;
