import React, { useState, useContext, useEffect, useRef } from "react";

import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";

import request from "../helpers/request";

import Modal from "./Modal";
import { default as LoginFormStyles } from "./LoginForm.module.scss";

const style = bemCssModules(LoginFormStyles);

const AddEditPhoto = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [description, setDescription] = useState("");
  const [fileAddress, setFileAddress] = useState("");
  const [id, setId] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [theme, setTheme] = useState("");
  const [title, setTitle] = useState("");

  const fileInputRef = useRef();

  const {
    currentPhoto,
    editMode,
    fetchPhotoData,
    handleClose,
    isModalActive,
    themes,
  } = useContext(StoreContext);

  const clearModalAddPhoto = () => {
    setSelectedFile("");
    setDescription("");
    setFileAddress("");
    setKeywords("");
    setTheme("");
    setTitle("");
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    handleClose();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileAddress(file.name);
  };

  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append("file", selectedFile);
    console.log("dataForm file: " + dataForm);

    await request.post("/upload", dataForm).then((res) => {
      console.log(res.statusText);
    });

    const { data, status } = await request.post("/photos", {
      fileAddress,
      title,
      description,
      keywords: keywords.split(","),
      theme,
    });
    if (status === 201) {
      fetchPhotoData();
      clearModalAddPhoto();
    } else {
      setValidation(data.message);
    }
  };

  const handlePhotoEdit = async (e) => {
    e.preventDefault();

    const { data, status } = await request.put("/photos", {
      id,
      fileAddress,
      title,
      description,
      keywords: keywords.split(","),
      theme,
    });
    if (status === 202) {
      fetchPhotoData();
      clearModalAddPhoto();
      handleClose();
    } else {
      setValidation(data.message);
    }
  };

  const selectOptions = themes.map((theme) => ({
    label: theme.themeName,
    value: theme.themeName,
  }));

  useEffect(() => {
    if (isModalActive) {
      if (!editMode) {
        clearModalAddPhoto();
        fileInputRef.current.value = "";
      }

      if (editMode) {
        setId(currentPhoto.id);
        setFileAddress(currentPhoto.fileAddress);
        setTitle(currentPhoto.title);
        setDescription(currentPhoto.description);
        setKeywords(currentPhoto.keywords);
        setTheme(currentPhoto.theme);
      }
    }
  }, [isModalActive]);

  return (
    <Modal
      outsideClick={true}
      isModalActive={isModalActive}
      handleClose={handleClose}
    >
      <form
        className={style()}
        method={editMode ? "put" : "post"}
        encType="multipart/form-data"
        onSubmit={editMode ? handlePhotoEdit : handlePhotoSubmit}
      >
        {editMode ? null : (
          <div className={style("login-input")}>
            <label>
              <br />
              Załaduj zdjęcie
              <input
                onChange={handleFileInput}
                onClick={(e) => (e.target.value = "")}
                ref={fileInputRef}
                type="file"
                defaultValue={selectedFile}
              />
            </label>
          </div>
        )}
        <div className={style("login-input")}>
          <label>
            Tytuł
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
            />
          </label>
        </div>
        <div className={style("login-input")}>
          <label>
            Opis
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              value={description}
            />
          </label>
        </div>
        <div className={style("login-input")}>
          <label>
            Słowa kluczowe
            <input
              onChange={(e) => setKeywords(e.target.value)}
              type="text"
              value={keywords}
            />
          </label>
        </div>
        <div className={style("login-input")}>
          <label>
            Temat
            <select onChange={(e) => setTheme(e.target.value)} value={theme}>
              <option value="none">none</option>
              {selectOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        </div>
        <div className={style("login-input")}>
          <button type="submit">
            {editMode ? "Edytuj zdjęcie" : "Dodaj zdjęcie"}
          </button>
          <button onClick={handleCloseModal}>Anuluj</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditPhoto;
