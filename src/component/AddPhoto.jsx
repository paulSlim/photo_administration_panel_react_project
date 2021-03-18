import React from 'react';

import bemCssModules from 'bem-css-modules';
// import { StoreContext } from '../store/StoreProvider';

import Modal from './Modal';
import { default as AddPhotoStyle } from './AddPhoto.module.scss';

const style = bemCssModules(AddPhotoStyle);

const AddPhoto = ({ handleClose, isModalActive }) => {
  return (
    <Modal outsideClick={true} isModalActive={isModalActive} handleClose={handleClose}>
      <form className={style()} method="post" encType="multipart/form-data" >
        <input type="file" name="file" />
        <input type="submit" value="Submit" />
      </form>
    </Modal>
  );
}

export default AddPhoto;