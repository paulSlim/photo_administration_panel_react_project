import React, { useContext, useState } from 'react';

import bemCssModules from 'bem-css-modules';
import { default as HeaderStyles } from './Header.module.scss';
import { StoreContext } from '../store/StoreProvider';

import AddPhoto from './AddPhoto';
import DisplayPhoto from './DisplayPhoto';
import LoginForm from './LoginForm';

const style = bemCssModules(HeaderStyles);

const Header = () => {
  const { 
    handleOnClickLogin, 
    modalContent,
    setEditMode, 
    user, 
  } = useContext(StoreContext);

  const isUserLogged = user ? 'Wyloguj się' : 'Zaloguj się';

  const handleAddPhoto = () => {
    setEditMode(false);
    handleOnClickLogin("isAddPhotoActive");
  }

  return (
    <header className={style()}>
      <h1 className={style('title')}>Panel administracyjny</h1>
      <div className={style('btn-container')}>
        <button onClick={handleAddPhoto} className={style('fn-btn')}>Dodaj zdjęcie</button>
        <button className={style('fn-btn')} disabled={false}>Dodaj temat</button>
        <button onClick={() => handleOnClickLogin("isLoginFormActive")} className={style('fn-btn')}>{isUserLogged}</button>
      </div>
      {modalContent.isAddPhotoActive && <AddPhoto />}
      {modalContent.isDisplayPhotoActive && <DisplayPhoto />}
      {modalContent.isLoginFormActive && <LoginForm />}
    </header>
  );
};

export default Header;