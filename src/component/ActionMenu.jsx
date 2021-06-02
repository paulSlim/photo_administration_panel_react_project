import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";

import { default as ActionMenuStyle } from "./ActionMenu.module.scss";

const style = bemCssModules(ActionMenuStyle);

const ActionMenu = ({
  id,
  fileAddress,
  description,
  title,
  keywords,
  theme,
  handleIsMenuOpen,
}) => {
  const {
    handleModalContent,
    photoDelete,
    setCurrentPhoto,
    setEditMode,
  } = useContext(StoreContext);

  const handleEditPhoto = () => {
    setEditMode(true);
    setCurrentPhoto({
      id,
      fileAddress,
      description,
      title,
      keywords,
      theme,
    });
    handleModalContent("isAddEditPhotoActive");
    handleIsMenuOpen();
  };

  const handlePhotoDelete = () => {
    photoDelete(id);
    handleIsMenuOpen();
  };

  return (
    <div className={style()}>
      <ul className={style("menu-fn-block")}>
        <li className={style("menu-fn")} onClick={handleEditPhoto}>
          Edytuj
        </li>
        <li className={style("menu-fn")} onClick={handlePhotoDelete}>
          {" "}
          Usuń
        </li>
        <li className={style("menu-fn")}> Przesuń w lewo</li>
        <li className={style("menu-fn")}> Przesuń w prawo</li>
      </ul>
    </div>
  );
};

export default ActionMenu;
