import React, { useContext, useState } from 'react';

import bemCssModules from 'bem-css-modules';
import { default as HeaderStyles } from './Header.module.scss';
import { StoreContext } from '../store/StoreProvider';

import AddPhoto from './AddPhoto';
import LoginForm from './LoginForm';

const style = bemCssModules(HeaderStyles);

const Header = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({
    isLoginFormActive: false,
    isAddPhotoActive: false,
  });
  const { user, setUser } = useContext(StoreContext);

  const handleClose = () => setIsModalActive(false);

  const handleOnClickLogin = (property) => {
    if (user) {
      setUser(null);
    } else {
      setIsModalActive(true);
    }

    let switchModalTemp = {
      isLoginFormActive: false,
      isAddPhotoActive: false,
    };
    switchModalTemp.[property] = true;
    setModalContent(switchModalTemp);
  }

  const isUserLogged = user ? 'Wyloguj się' : 'Zaloguj się';

  return (
    <header className={style()}>
      <h1 className={style('title')}>Panel administracyjny</h1>
      <div className={style('btn-container')}>
        <button onClick={() => handleOnClickLogin("isAddPhotoActive")} className={style('fn-btn')}>Dodaj</button>
        <button className={style('fn-btn')} disabled={false}>Usuń</button>
        <button className={style('fn-btn')} disabled={false}>Edytuj</button>
        <button className={style('fn-btn')} disabled={false}>Grupuj</button>
        <button onClick={() => handleOnClickLogin("isLoginFormActive")} className={style('fn-btn')}>{isUserLogged}</button>
      </div>
      {modalContent.isAddPhotoActive && <AddPhoto handleClose={handleClose} isModalActive={isModalActive} />}
      {modalContent.isLoginFormActive && <LoginForm handleClose={handleClose} isModalActive={isModalActive} />}
    </header>
  );
};

export default Header;