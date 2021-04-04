import React from 'react';

import bemCssModules from 'bem-css-modules';
// import { StoreContext } from '../store/StoreProvider';

import { default as PhotoElmntStyle } from './PhotoElmnt.module.scss';

const style = bemCssModules(PhotoElmntStyle);

const PhotoElmnt = ({ id, description, fileAddress, title, keywords, theme }) => {
  return (
    <div className={style()}>
      <img alt={title} className={style("image")} src={fileAddress} />
      {/* <ul>
        <li className={style("info")}>id: {id}</li>
        <li className={style("info")}>autor: {authors[0]}</li>
        <li className={style('info')}>tytuł: {title}</li>
      </ul> */}
    </div>
  );
}

export default PhotoElmnt;