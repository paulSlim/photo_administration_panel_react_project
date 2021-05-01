import React, { useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import bemCssModules from "bem-css-modules";

import { default as Styles } from "./Modal.module.scss";

const style = bemCssModules(Styles);

const Modal = ({ children, isModalActive, outsideClick, handleClose }) => {
  const modalRef = useRef(null);
  const prevElement = useRef(null);

  useEffect(() => {
    if (!modalRef.current) return;

    const { current: modal } = modalRef;

    if (isModalActive) {
      prevElement.current = document.activeElement;
      modal.showModal();
    } else if (prevElement.current) {
      modal.close();
      prevElement.current.focus();
    }
  }, [isModalActive]);

  useEffect(() => {
    const { current: modal } = modalRef;

    const handleCancel = (e) => {
      e.preventDefault();
      handleClose();
    };

    modal.addEventListener("cancel", handleCancel);

    return () => {
      modal.removeEventListener("cancel", handleCancel);
    };
  }, [handleClose]);

  const handleOutsideClick = ({ target }) => {
    const { current } = modalRef;

    if (outsideClick && target === current) {
      handleClose();
    }
  };

  return ReactDOM.createPortal(
    <dialog className={style()} ref={modalRef} onClick={handleOutsideClick}>
      {children}
    </dialog>,
    document.body
  );
};

export default Modal;
