import React, { useState, useContext } from "react";

import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";

// import request from '../helpers/request';

import Modal from "./Modal";
import { default as DisplayPhotoStyle } from "./DisplayPhoto.module.scss";

const style = bemCssModules(DisplayPhotoStyle);

const PhotoDisplay = () => {
  const {
    currentPhoto,
    handleClose,
    isModalActive,
    photos,
    setCurrentPhoto,
  } = useContext(StoreContext);

  const displaySwitch = (direction) => {
    let currentPhotoIndex = photos.findIndex(
      (photo) => photo.id === currentPhoto.id
    );

    if (direction === "prev") {
      currentPhotoIndex = currentPhotoIndex - 1;
      if (currentPhotoIndex < 0) {
        setCurrentPhoto(photos[photos.length - 1]);
      } else setCurrentPhoto(photos[currentPhotoIndex]);
    }

    if (direction === "next") {
      currentPhotoIndex = currentPhotoIndex + 1;
      if (currentPhotoIndex >= photos.length) {
        setCurrentPhoto(photos[0]);
      } else setCurrentPhoto(photos[currentPhotoIndex]);
    }
  };

  return (
    <Modal
      outsideClick={true}
      isModalActive={isModalActive}
      handleClose={handleClose}
    >
      <div className={style()}>
        <img
          className={style("photo")}
          src={`http://localhost:8000/${currentPhoto.fileAddress}`}
          alt={currentPhoto.title}
        />
        <span className={style("prev")} onClick={() => displaySwitch("prev")}>
          &#10094;
        </span>
        <span className={style("next")} onClick={() => displaySwitch("next")}>
          &#10095;
        </span>
      </div>
    </Modal>
  );
};

export default PhotoDisplay;
