import React, {useState} from 'react';

import bemCssModules from 'bem-css-modules';
// import { StoreContext } from '../store/StoreProvider';

// import { default as PhotoElmntStyle } from './PhotoElmnt.module.scss';
import { default as ActionMenuStyle } from './ActionMenu.module.scss';

// const style0 = bemCssModules(PhotoElmntStyle);
const style = bemCssModules(ActionMenuStyle);

const ActionMenu = ({ id, description, fileAddress, title, keywords, theme, handleIsMenuOpen }) => {

    const handlePhotoDelete = () => {
        console.log(id);
    }

  return (
    <div className={style()}>
        <ul className={style("menu-fn-block")}>
            <li className={style("menu-fn")}> Podgląd</li>
            <li className={style("menu-fn")}> Edytuj</li>
            <li className={style("menu-fn")} onClick={handlePhotoDelete}> Usuń</li>
            <li className={style("menu-fn")}> W lewo</li>
            <li className={style("menu-fn")}> W prawo</li>
        </ul>
    </div>
  );
}

export default ActionMenu;