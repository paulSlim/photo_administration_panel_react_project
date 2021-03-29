import React, { useState, useContext } from 'react';

import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../store/StoreProvider';

import request from '../helpers/request';

import Modal from './Modal';
import { default as AddPhotoStyle } from './AddPhoto.module.scss';

const style = bemCssModules(AddPhotoStyle);

const AddPhoto = ({ handleClose, isModalActive }) => {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [fileName, setFileName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [theme, setTheme] = useState('');

  const { fetchPhotoData } = useContext(StoreContext);

  const handleFileInput = e => {
    const file = e.target.files[0];
    setSelectedFile(e.target.files[0]);
    setFileName(file.name);
  }

  const handleCloseModal = e => {
    e.preventDefault();
    handleClose();
  }

  const handlePhotoSubmit = async e => {
    e.preventDefault();
    // const test = {
    //   fileName,
    //   title,
    //   description,
    //   keywords,
    //   theme
    // };
    // console.log(test);
    const { data, status } = await request.post(
      '/photos',
      { selectedFile, fileName, title, description, keywords, theme }
    );
    if (status === 201) {
      fetchPhotoData();
      clearModal();
      handleClose();
    } else {
      setValidation(data.message);
    }
  }


  return (
    <Modal outsideClick={true} isModalActive={isModalActive} handleClose={handleClose}>
      <form className={style()} method="post" encType="multipart/form-data" onSubmit={handlePhotoSubmit}>
        <div>
          <label>Załaduj zdjęcie
          <input onChange={handleFileInput} type="file" defaultValue={selectedFile} />
          </label>
          <label>Tytuł
          <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} />
          </label>
          <label>Opis
          <input onChange={(e) => setDescription(e.target.value)} type="text" value={description} />
          </label>
          <label>Słowa kluczowe
          <input onChange={(e) => setKeywords(e.target.value)} type="text" value={keywords} />
          </label>
          <label>Temat
          <input onChange={(e) => setTheme(e.target.value)} type="text" value={theme} />
          </label>
        </div>
        <div>
          <button type="submit">Dodaj zdjęcie</button>
          <button onClick={handleCloseModal}>Anuluj</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPhoto;