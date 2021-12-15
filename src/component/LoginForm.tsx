import { useContext, useEffect, useState } from "react";
// import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";

import Modal from "./Modal";
import style from "./LoginForm.module.scss";

import request from "../helpers/request";

// const style = bemCssModules(LoginFormStyles);

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    setUser,
    handleClose,
    isModalActive,
    setValidation,
    validation,
  } = useContext(StoreContext);

  const validationElement = validation.length ? (
    <span className={style["login-form__validation"]}>{validation}</span>
  ) : null;

  const handleOnChangeLogin = ({
    target,
  }: {
    target: HTMLInputElement;
  }): void => setLogin(target.value);
  const handleOnChangePassword = ({
    target: { value },
  }: {
    target: HTMLInputElement;
  }) => setPassword(value);

  const clearModal = (): void => {
    setLogin("");
    setPassword("");
    setValidation("");
  };

  const handleOnSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();
    const { data, status } = await request.post("/users", { login, password });
    if (status === 200) {
      setUser(data.user);
      clearModal();
      handleClose();
    } else {
      setValidation(data.message);
    }
  };
  const handleCloseModal = (e: Event) => {
    e.preventDefault();
    handleClose();
  };

  useEffect(() => {
    if (isModalActive) {
      clearModal();
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
        method="post"
        onSubmit={(e) => handleOnSubmit}
      >
        <div className={style["login-form__login-input"]}>
          <label>
            Login:
            <input onChange={handleOnChangeLogin} type="text" value={login} />
          </label>
        </div>
        <div className={style["login-form__login-input"]}>
          <label>
            Hasło:
            <input
              onChange={handleOnChangePassword}
              type="password"
              value={password}
            />
          </label>
        </div>
        <div className={style["login-form__login-input"]}>
          <button type="submit">Zaloguj się</button>
          <button onClick={(e) => handleCloseModal} type="button">
            Anuluj
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
