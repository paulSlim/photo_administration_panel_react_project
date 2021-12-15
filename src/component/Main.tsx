import { useContext } from "react";

// import bemCssModules from "bem-css-modules";
import { StoreContext } from "../store/StoreProvider";

import style from "./Main.module.scss";

import PhotoElmnt from "./PhotoElmnt";
import { SelectedPhotos } from "../data.types/StoreProvider";

// const style = bemCssModules(mainStyle);

const Main: React.FC = () => {
  const { photos, selectedPhotoIds, setSelectedPhotoIds, user } = useContext(
    StoreContext
  );

  const selectPhoto = (idObject: SelectedPhotos): void => {
    let selectedPhotoIdsArray = [...selectedPhotoIds];
    selectedPhotoIdsArray.push(idObject);
    console.log("Dodane ids", selectedPhotoIdsArray);
    setSelectedPhotoIds(selectedPhotoIdsArray);
  };

  const deselectPhoto = (idObject: SelectedPhotos): void => {
    let selectedPhotoIdsArray = selectedPhotoIds.filter(
      (photo) => photo.id !== idObject.id
    );
    console.log("Usunięte ids", selectedPhotoIdsArray);
    setSelectedPhotoIds(selectedPhotoIdsArray);
  };

  const listPhotos = photos.map((photo) => (
    <PhotoElmnt
      key={photo.id}
      {...photo}
      selectPhoto={selectPhoto}
      deselectPhoto={deselectPhoto}
    />
  ));

  // const displayList = listPhotos && user?.accessLevel === 1;

  return (
    <main className={style.main}>
      {/* {displayList ? listPhotos : null} */}
      {listPhotos}
    </main>
  );
};

export default Main;
