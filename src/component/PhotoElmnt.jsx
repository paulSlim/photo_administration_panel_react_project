import React, { useState, useContext } from "react";

import ActionMenu from "./ActionMenu";

import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";
import { default as PhotoElmntStyle } from "./PhotoElmnt.module.scss";

const style = bemCssModules(PhotoElmntStyle);

const PhotoElmnt = ({
  id,
  description,
  fileAddress,
  title,
  keywords,
  theme,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { handleModalContent, setCurrentPhoto } = useContext(StoreContext);

  const handleIsMenuOpen = () => {
    setIsMenuOpen((prevValue) => !prevValue);
  };

  const handleDisplayPhoto = () => {
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

  return (
    <div className={style()}>
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
        className={style("image")}
        src={`http://localhost:8000/${fileAddress}`}
      />
      <div className={style("meatballs-menu")} onClick={handleIsMenuOpen}>
        <span>{isMenuOpen ? "x" : "..."}</span>
      </div>
      <div className={style("photo-card-content")} onClick={handleDisplayPhoto}>
        <ul className={style("info")}>
          <li className={style("info-title")}>{title}</li>
          <li className={style("info-theme")}>{theme}</li>
          <li className={style("info-description")}>{description}</li>
          <li className={style("info-keywords")}>{keywords}</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoElmnt;
