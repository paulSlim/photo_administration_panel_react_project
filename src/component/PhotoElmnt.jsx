import React from 'react';

import bemCssModules from 'bem-css-modules';
// import { StoreContext } from '../store/StoreProvider';

import { default as PhotoElmntStyle } from './PhotoElmnt.module.scss';

const style = bemCssModules(PhotoElmntStyle);

const PhotoElmnt = ({ id, description, fileAddress, title, keywords, theme }) => {
  return (
    <div className={style()}>
      <img alt={title} className={style("image")} src={fileAddress} />
      <div className={style("photo-card-content")}>
        <ul className={style("info")}>
          <li className={style("info-title")}>{title}</li>
          <li className={style("info-keywords")}>{keywords}</li>
          <li className={style("info-theme")}>{theme}</li>
          <li className={style("info-description")}>{description}</li>
        </ul>
      </div>
    </div>
  );
}

export default PhotoElmnt;