import React, { useContext } from 'react';

import bemCssModules from 'bem-css-modules';
import { StoreContext } from '../store/StoreProvider';

import { default as mainStyle } from './Main.module.scss';

import PhotoElmnt from './PhotoElmnt';

const style = bemCssModules(mainStyle);

const Main = () => {

  const { user, setUser, photos, setPhotos } = useContext(StoreContext);

  const listPhotos = photos.map((photo, index) => <PhotoElmnt key={photo.id} {...photo} />
  );

  // const displayList = listPhotos && user?.accessLevel === 1;

  return (
    <main className={style()}>
      {/* {displayList ? listPhotos : null} */}
      {listPhotos}
    </main>
  );
}

export default Main;
