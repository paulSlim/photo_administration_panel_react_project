import { useState, useContext } from "react";

import ActionMenu from "./ActionMenu";

// import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";
import style from "./PhotoElmnt.module.scss";
import LoginForm from "./LoginForm";
import ReactTooltip from "react-tooltip";
import BulkCheckbox from "./BulkCheckbox";

// const style = bemCssModules(PhotoElmntStyle);

import { Photo, SelectedPhotos } from "../data.types/StoreProvider";

interface PhotoElement extends Photo {
  selectPhoto: (idObject: SelectedPhotos) => void;
  deselectPhoto: (idObject: SelectedPhotos) => void;
}

const PhotoElmnt: React.FC<PhotoElement> = ({
  id,
  description,
  fileAddress,
  title,
  keywords,
  theme,
  selectPhoto,
  deselectPhoto,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTooltipActive, setIsTooltipActive] = useState(false);

  const { handleModalContent, setCurrentPhoto } = useContext(StoreContext);

  const handleIsMenuOpen = (): void => {
    setIsMenuOpen((prevValue: boolean) => !prevValue);
  };

  const handleDisplayPhoto = (): void => {
    setCurrentPhoto({
      id,
      description,
      fileAddress,
      title,
      keywords,
      theme,
    });
    handleModalContent("isDisplayPhotoActive");
  };

  const displayTooltip = (e: Event) => {
    const target = e.currentTarget as EventTarget;
    if (
      (e.currentTarget as HTMLDivElement).scrollWidth >
      (e.currentTarget as HTMLDivElement).clientWidth
    ) {
      setIsTooltipActive(true);
    }
  };

  const hideTooltip = () => {
    setIsTooltipActive(false);
  };

  const photoInfo = [{ title }, { theme }, { description }, { keywords }];

  const infoList = photoInfo.map((elmnt, index) => {
    const entries = Object.entries(elmnt);
    const [key, value] = entries[0];
    const className = key === "title" ? style["photo-card__info-title"] : "";
    return (
      <li
        key={index}
        className={className}
        data-tip={value}
        onMouseEnter={(e) => displayTooltip}
        onMouseLeave={hideTooltip}
      >
        {key === "keywords" ? value.join(", ") : value}
      </li>
    );
  });

  return (
    <div className={style["photo-card"]}>
      <BulkCheckbox
        id={id}
        selectPhoto={selectPhoto}
        deselectPhoto={deselectPhoto}
      />
      {isMenuOpen && (
        <ActionMenu
          id={id}
          description={description}
          fileAddress={fileAddress}
          title={title}
          keywords={keywords}
          theme={theme}
          handleIsMenuOpen={handleIsMenuOpen}
        />
      )}
      <img
        alt={title}
        className={style["photo-card__image"]}
        src={`http://localhost:8000/${fileAddress}`}
      />
      <div
        className={style["photo-card__meatballs-menu"]}
        onClick={handleIsMenuOpen}
      >
        <span>{isMenuOpen ? "x" : "..."}</span>
      </div>
      {isTooltipActive && <ReactTooltip />}
      <div
        className={style["photo-card__photo-card-content"]}
        onClick={handleDisplayPhoto}
      >
        <ul className={style["photo-card__info"]}>{infoList}</ul>
      </div>
    </div>
  );
};

export default PhotoElmnt;
