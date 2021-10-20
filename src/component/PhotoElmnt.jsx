import React, { useState, useContext } from "react";

import ActionMenu from "./ActionMenu";

import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";
import { default as PhotoElmntStyle } from "./PhotoElmnt.module.scss";
import LoginForm from "./LoginForm";
import ReactTooltip from "react-tooltip";

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
  const [isTooltipActive, setIsTooltipActive] = useState(false);

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

  const displayTooltip = (e) => {
    if (e.currentTarget.scrollWidth > e.currentTarget.clientWidth) {
      setIsTooltipActive(true);
    }
  };

  const hideTooltip = () => {
    setIsTooltipActive(false);
  };

  const photoInfo = [{ title }, { theme }, { description }, { keywords }];

  const infoList = photoInfo.map((elmnt) => {
    const entries = Object.entries(elmnt);
    const [key, value] = entries[0];
    const className = `info-${key}`;
    return (
      <li
        className={style(className)}
        data-tip={value}
        onMouseEnter={displayTooltip}
        onMouseLeave={hideTooltip}
      >
        {value}
      </li>
    );
  });

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
      {isTooltipActive && <ReactTooltip />}
      <div className={style("photo-card-content")} onClick={handleDisplayPhoto}>
        <ul className={style("info")}>{infoList}</ul>
      </div>
    </div>
  );
};

export default PhotoElmnt;
