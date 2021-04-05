import React, { useState, useContext, useEffect, useRef } from 'react';

import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../store/StoreProvider';

import request from '../helpers/request';

import Modal from './Modal';
import { default as LoginFormStyles } from './LoginForm.module.scss';

const style = bemCssModules(LoginFormStyles);

const AddPhoto = ({ handleClose, isModalActive }) => {
  const [selectedFile, setSelectedFile] = useState('');
  const [fileAddress, setFileAddress] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [theme, setTheme] = useState('');

  const fileInputRef = useRef();

  const { fetchPhotoData } = useContext(StoreContext);

  const handleFileInput = e => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileAddress(`http://localhost:8000/${file.name}`);
  }

  const clearModalAddPhoto = () => {
    setSelectedFile('');
    setFileAddress('');
    setTitle('');
    setDescription('');
    setKeywords('');
    setTheme('');
  }

  const handleCloseModal = e => {
    e.preventDefault();
    handleClose();
  }

  const handlePhotoSubmit = async e => {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append('file', selectedFile);
    console.log('dataForm file: ' + dataForm);

    await request.post(
      '/upload',
      dataForm
    ).then(res => {
      console.log(res.statusText)
    });

    const { data, status } = await request.post(
      '/photos',
      { fileAddress, title, description, keywords, theme }
    );
    if (status === 201) {
      fetchPhotoData();
      clearModalAddPhoto();
    } else {
      setValidation(data.message);
    }
  }

  useEffect(() => {
    if (isModalActive) {
      clearModalAddPhoto();
      fileInputRef.current.value = '';
    }

  }, [isModalActive]);

  return (
    <Modal outsideClick={true} isModalActive={isModalActive} handleClose={handleClose}>
      <form className={style()} method="post" encType="multipart/form-data" onSubmit={handlePhotoSubmit}>
        <div className={style('login-input')}>
          <label>Załaduj zdjęcie
          <input onChange={handleFileInput} onClick={e => e.target.value = ''} ref={fileInputRef} type="file" defaultValue={selectedFile} />
          </label>
        </div>
        <div className={style('login-input')}>
          <label>Tytuł
          <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} />
          </label>
        </div>
        <div className={style('login-input')}>
          <label>Opis
          <input onChange={(e) => setDescription(e.target.value)} type="text" value={description} />
          </label>
        </div>
        <div className={style('login-input')}>
          <label>Słowa kluczowe
          <input onChange={(e) => setKeywords(e.target.value)} type="text" value={keywords} />
          </label>
        </div>
        <div className={style('login-input')}>
          <label>Temat
          <input onChange={(e) => setTheme(e.target.value)} type="text" value={theme} />
          </label>
        </div>
        <div className={style('login-input')}>
          <button type="submit">Dodaj zdjęcie</button>
          <button onClick={handleCloseModal}>Anuluj</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPhoto;