import React, { useContext, useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../store/StoreProvider';

import Modal from './Modal';
import { default as LoginFormStyles } from './LoginForm.module.scss';

import request from '../helpers/request';

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleClose, isModalActive }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState('');

  const { setUser } = useContext(StoreContext);

  const validationElement = validation.length ? <span className={style('validation')}>{validation}</span> : null;

  const handleOnChangeLogin = ({ target }) => setLogin(target.value);
  const handleOnChangePassword = ({ target: { value } }) => setPassword(value);

  const clearModal = () => {
    setLogin('');
    setPassword('');
    setValidation('');
  }

  const handleOnSubmit = async e => {
    e.preventDefault();
    const { data, status } = await request.post(
      '/users',
      { login, password }
    );
    if (status === 200) {
      setUser(data.user);
      clearModal();
      handleClose();
    } else {
      setValidation(data.message);
    }
  }
  const handleCloseModal = e => {
    e.preventDefault();
    handleClose();
  }

  useEffect(() => {
    if (isModalActive) {
      clearModal();
    }

  }, [isModalActive]);

  return (
    <Modal outsideClick={true} isModalActive={isModalActive} handleClose={handleClose}>
      {validationElement}
      <form className={style()} method='post' onSubmit={handleOnSubmit}>
        <div className={style('login-input')}>
          <label>
            Login:
            <input onChange={handleOnChangeLogin} type='text' value={login} />
          </label>
        </div>
        <div className={style('login-input')}>
          <label>
            Hasło:
            <input onChange={handleOnChangePassword} type='password' value={password} />
          </label>
        </div>
        <div className={style('login-input')}>
          <button type='submit'>Zaloguj się</button>
          <button onClick={handleCloseModal} type='button'>Anuluj</button>
        </div>
      </form>
    </Modal>
  );
}

export default LoginForm;