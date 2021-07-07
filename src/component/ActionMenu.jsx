import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";
import request from "../helpers/request";
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
    fetchPhotoData,
    handleModalContent,
    photos,
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

  const handleMovePhoto = async (direction) => {
    const indexPhotoToMove = photos.findIndex((photo) => photo.id === id);
    console.log("indexPhotoToMove", indexPhotoToMove);

    let neighbourId = "";

    if (direction === "prepend") {
      if (indexPhotoToMove === 0) return;
      neighbourId = photos[indexPhotoToMove - 1]?.id;
      console.log("neighbourId prepend", neighbourId);
    }

    if (direction === "append") {
      if (indexPhotoToMove === photos.length - 1) return;
      neighbourId = photos[indexPhotoToMove + 1]?.id;
      console.log("neighbourId append", neighbourId);
    }

    const { data, status } = await request.post("/order", {
      id,
      fileAddress,
      title,
      description,
      keywords,
      theme,
      neighbourId,
      direction,
    });
    if (status === 200) {
      fetchPhotoData();
    } else {
      setValidation(data.message);
    }
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
        <li
          className={style("menu-fn")}
          onClick={() => handleMovePhoto("prepend")}
        >
          {" "}
          Przesuń w lewo
        </li>
        <li
          className={style("menu-fn")}
          onClick={() => handleMovePhoto("append")}
        >
          {" "}
          Przesuń w prawo
        </li>
      </ul>
    </div>
  );
};

export default ActionMenu;
