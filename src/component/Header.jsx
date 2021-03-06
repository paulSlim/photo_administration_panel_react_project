import React, { useContext, useState } from 'react';

import bemCssModules from 'bem-css-modules';
import { default as HeaderStyles } from './Header.module.scss';

import LoginForm from './LoginForm';

import { StoreContext } from '../store/StoreProvider';

const style = bemCssModules(HeaderStyles);

const Header = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const { user, setUser } = useContext(StoreContext);

  const handleClose = () => setIsModalActive(false);

  const handleOnClick = () => {
    if (user) {
      setUser(null);
    } else {
      setIsModalActive(true);
    }
  }

  const isUserLogged = user ? 'Wyloguj się' : 'Zaloguj się';

  return (
    <header className={style()}>
      <h1 className={style('title')}>Panel administracyjny</h1>
      <div className={style('btn-container')}>
        <button className={style('fn-btn')}>Dodaj</button>
        <button className={style('fn-btn')} disabled={false}>Usuń</button>
        <button className={style('fn-btn')} disabled={false}>Edytuj</button>
        <button className={style('fn-btn')} disabled={false}>Grupuj</button>
        <button onClick={handleOnClick} className={style('fn-btn')}>{isUserLogged}</button>
      </div>
      <LoginForm handleClose={handleClose} isModalActive={isModalActive} />
    </header>
  );
};

export default Header;