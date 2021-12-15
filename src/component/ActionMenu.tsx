import { useContext } from "react";
// import bemCssModules from "bem-css-modules";
import request from "../helpers/request";
import { StoreContext } from "../store/StoreProvider";

import style from "./ActionMenu.module.scss";

import { Photo } from "../data.types/StoreProvider";

// const style = bemCssModules(ActionMenuStyle);

interface Props extends Photo {
  handleIsMenuOpen: () => void;
}

const ActionMenu: React.FC<Props> = ({
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
    setValidation,
  } = useContext(StoreContext);

  const handleEditPhoto = (): void => {
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

  const handlePhotoDelete = (): void => {
    photoDelete(id);
    handleIsMenuOpen();
  };

  const handleMovePhoto = async (direction: string): Promise<void> => {
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
    <div className={style["menu-container"]}>
      <ul className={style["menu-container__menu-fn-block"]}>
        <li
          className={style["menu-container__menu-fn"]}
          onClick={handleEditPhoto}
        >
          Edytuj
        </li>
        <li
          className={style["menu-container__menu-fn"]}
          onClick={handlePhotoDelete}
        >
          {" "}
          Usuń
        </li>
        <li
          className={style["menu-container__menu-fn"]}
          onClick={() => handleMovePhoto("prepend")}
        >
          {" "}
          Przesuń w lewo
        </li>
        <li
          className={style["menu-container__menu-fn"]}
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
