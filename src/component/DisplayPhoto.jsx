import React, { useState, useContext } from 'react';

import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../store/StoreProvider';

import request from '../helpers/request';

import Modal from './Modal';
import { default as DisplayPhotoStyle } from './DisplayPhoto.module.scss';

const style = bemCssModules(DisplayPhotoStyle);

const PhotoDisplay = ({}) => {

  const { fetchPhotoData, handleClose, isModalActive, currentPhoto } = useContext(StoreContext);

  const handleClosePhoto = e => {
    e.preventDefault();
    handleClose();
  }

  return (
    <Modal outsideClick={true} isModalActive={isModalActive} handleClose={handleClose}>
        <div className={style()}>
            <img className={style("photo")} src={`http://localhost:8000/${currentPhoto.fileAddress}`} alt=""/>
        </div>
    </Modal>
  );
};

export default PhotoDisplay;