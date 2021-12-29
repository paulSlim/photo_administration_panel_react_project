import { useContext } from "react";

import { StoreContext } from "../store/StoreProvider";
import style from "./LoginForm.module.scss";

interface ValidationMessageProps {}

const ValidationMessage: React.FC<ValidationMessageProps> = () => {
  const { validation } = useContext(StoreContext);
  return validation.length ? (
    <span className={style["login-form__validation"]}>{validation}</span>
  ) : null;
};

export default ValidationMessage;
