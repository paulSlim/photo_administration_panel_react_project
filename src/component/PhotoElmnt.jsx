import React, {useState} from 'react';

import ActionMenu from './ActionMenu';

import bemCssModules from 'bem-css-modules';
// import { StoreContext } from '../store/StoreProvider';
import { default as PhotoElmntStyle } from './PhotoElmnt.module.scss';

const style = bemCssModules(PhotoElmntStyle);

const PhotoElmnt = ({ id, description, fileAddress, title, keywords, theme }) => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleIsMenuOpen = () => {
    setIsMenuOpen(prevValue => !prevValue);
  }  
  
  return (
    <div className={style()}>
      {isMenuOpen && <ActionMenu id={id} description={description} fileAddress={fileAddress} title={title} keywords={keywords} theme={theme} handleIsMenuOpen={handleIsMenuOpen}/>}
      <img alt={title} className={style("image")} src={`http://localhost:8000/${fileAddress}`} />
      <div className={style("photo-card-content")} onBlur={() => setIsMenuOpen(false)}>
        <div className={style("meatballs-menu")} onClick={handleIsMenuOpen}>
          <span>{isMenuOpen ? "x" : "..."}</span>
        </div>
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