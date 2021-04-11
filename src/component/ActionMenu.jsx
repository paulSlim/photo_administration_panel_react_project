import React, {useContext} from 'react';


import bemCssModules from 'bem-css-modules';
import request from '../helpers/request';
import { StoreContext } from '../store/StoreProvider';


import { default as ActionMenuStyle } from './ActionMenu.module.scss';

const style = bemCssModules(ActionMenuStyle);

const ActionMenu = ({ id, description, fileAddress, title, keywords, theme, handleIsMenuOpen }) => {

  const { fetchPhotoData, handleOnClickLogin } = useContext(StoreContext);
  
  const handlePhotoDelete = async () => {
      const { data, status } = await request.delete(
        `/photos/${id}`,
      );
      if (status === 200) {
        fetchPhotoData();
      } else {
        setValidation(data.message);
      }
    }
    

  return (
    <div className={style()}>
        <ul className={style("menu-fn-block")}>
            <li className={style("menu-fn")}> Edytuj</li>
            <li className={style("menu-fn")} onClick={handlePhotoDelete}> Usuń</li>
            <li className={style("menu-fn")}> W lewo</li>
            <li className={style("menu-fn")}> W prawo</li>
        </ul>
    </div>
  );
}

export default ActionMenu;