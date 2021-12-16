import { useState, useContext, useEffect, useRef } from "react";

// import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";

import request from "../helpers/request";

import Modal from "./Modal";
import style from "./LoginForm.module.scss";

// const style = bemCssModules(LoginFormStyles);

const AddEditPhoto: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | File>("");
  const [description, setDescription] = useState<string>("");
  const [fileAddress, setFileAddress] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [theme, setTheme] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    currentPhoto,
    editMode,
    fetchPhotoData,
    handleClose,
    isModalActive,
    themes,
    setValidation,
    validation,
  } = useContext(StoreContext);

  const validationElement = validation.length ? (
    <span className={style["login-form__validation"]}>{validation}</span>
  ) : null;

  const clearModalAddPhoto = (): void => {
    setSelectedFile("");
    setDescription("");
    setFileAddress("");
    setKeywords([]);
    setTheme("");
    setTitle("");
  };

  const handleCloseModal = (e): void => {
    e.preventDefault();
    handleClose();
  };

  const handleFileInput = (e): void => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setSelectedFile(file);
    setFileAddress(file.name);
  };

  const handlePhotoSubmit = async (e): Promise<void> => {
    e.preventDefault();
    const dataForm: FormData = new FormData();
    dataForm.append("file", selectedFile);
    await request.post("/upload", dataForm).then((res) => {
      console.log(res.statusText);
    });

    const { data, status } = await request.post("/photos", {
      fileAddress,
      title,
      description,
      keywords: keywords,
      theme,
    });
    if (status === 201) {
      fetchPhotoData();
      clearModalAddPhoto();
    } else {
      setValidation(data.message);
    }
  };

  const handlePhotoEdit = async (e): Promise<void> => {
    e.preventDefault();

    // const keywordsSplit = (): string[] => {
    //   let keywordsArray = keywords;
    //   if (typeof keywordsArray === "string") {
    //     if (keywordsArray.includes(",")) {
    //       keywordsArray = keywords.split(",");
    //     }
    //     if (keywordsArray.includes(" ")) {
    //       keywordsArray = keywords.split(" ");
    //     }
    //   }
    //   return keywordsArray;
    // };

    const { data, status } = await request.put("/photos", {
      id,
      fileAddress,
      title,
      description,
      keywords,
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
        fileInputRef.current!.value = "";
      }

      if (editMode) {
        setId(currentPhoto!.id);
        setFileAddress(currentPhoto!.fileAddress);
        setTitle(currentPhoto!.title);
        setDescription(currentPhoto!.description);
        setKeywords(currentPhoto!.keywords);
        setTheme(currentPhoto!.theme);
      }
    }
  }, [isModalActive]);

  return (
    <Modal
      outsideClick={true}
      isModalActive={isModalActive}
      handleClose={handleClose}
    >
      {validationElement}
      <form
        className={style["login-form"]}
        method={editMode ? "put" : "post"}
        encType="multipart/form-data"
        onSubmit={editMode ? handlePhotoEdit : handlePhotoSubmit}
      >
        {editMode ? null : (
          <div className={style["login-form__login-input"]}>
            <label>
              <br />
              Załaduj zdjęcie
              <input
                onChange={handleFileInput}
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = "";
                }}
                ref={fileInputRef}
                type="file"
                defaultValue={""}
              />
            </label>
          </div>
        )}
        <div className={style["login-form__login-input"]}>
          <label>
            Tytuł
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
            />
          </label>
        </div>
        <div className={style["login-form__login-input"]}>
          <label>
            Opis
            <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              value={description}
            />
          </label>
        </div>
        <div className={style["login-form__login-input"]}>
          <label>
            Słowa kluczowe
            <input
              onChange={(e) => setKeywords(e.target.value.split(","))}
              type="text"
              value={keywords}
            />
          </label>
        </div>
        <div className={style["login-form__login-input"]}>
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
        <div className={style["login-form__login-input"]}>
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
