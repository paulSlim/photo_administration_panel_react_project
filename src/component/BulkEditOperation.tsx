import { useContext, useState } from "react";

import Modal from "./Modal";
import request from "../helpers/request";

import { StoreContext } from "../store/StoreProvider";

import style from "./LoginForm.module.scss";

interface BulkEditProps {}

const BulkEditOperation: React.FC<BulkEditProps> = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [theme, setTheme] = useState("");

  const {
    fetchPhotoData,
    handleClose,
    isModalActive,
    selectedPhotoIds,
    setSelectedPhotoIds,
    setValidation,
    themes,
    validation,
  } = useContext(StoreContext);

  const clearInputs = () => {
    setKeywords([]);
    setTheme("");
  };

  const selectOptions = themes.map((theme) => ({
    label: theme.themeName,
    value: theme.themeName,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (keywords.length > 0 || theme) {
      const { data, status } = await request.patch("/photos", {
        selectedPhotoIds,
        keywords,
        theme,
      });
      if (status === 202) {
        fetchPhotoData();
        clearInputs();
        handleClose();
        setSelectedPhotoIds([]);
      } else {
        setValidation(data.message);
      }
    } else return;
  };

  return (
    <Modal
      outsideClick={true}
      isModalActive={isModalActive}
      handleClose={handleClose}
    >
      <form
        className={style["login-form"]}
        method={"patch"}
        encType={"multipart/form-data"}
        onSubmit={handleSubmit}
      >
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
          <button type="submit">Edytuj</button>
          <button onClick={handleClose}>Anuluj</button>
        </div>
      </form>
    </Modal>
  );
};

export default BulkEditOperation;
