import { createContext, useEffect, useState } from "react";

import {
  EditMode,
  ModalActive,
  ModalContent,
  Photo,
  Theme,
  User,
} from "../data.types/StoreProvider";

import request from "../helpers/request";

const StoreProvider = ({ children }: any): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photosCache, setPhotosCache] = useState<Photo[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  const [editMode, setEditMode] = useState<EditMode>(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [isModalActive, setIsModalActive] = useState<ModalActive>(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    isAddEditPhotoActive: false,
    isAddEditThemeActive: false,
    isEditPhotoActive: false,
    isDisplayPhotoActive: false,
    isLoginFormActive: false,
  });

  const fetchPhotoData = async (): Promise<void> => {
    const { data } = await request.get("/photos");
    setPhotos(data.photos);
    setPhotosCache(data.photos);
  };

  const fetchThemesData = async (): Promise<void> => {
    const { data } = await request.get("/themes");
    setThemes(data.themes);
  };

  const handleClose = (): void => {
    setIsModalActive(false);
  };

  const handleModalContent = (property: string) => {
    if (user) {
      setUser(null);
    } else {
      setIsModalActive(true);
    }

    let switchModalTemp: ModalContent = {
      isAddEditPhotoActive: false,
      isAddEditThemeActive: false,
      isEditPhotoActive: false,
      isDisplayPhotoActive: false,
      isLoginFormActive: false,
    };
    switchModalTemp[property] = true;
    setModalContent(switchModalTemp);
  };

  const photoDelete = async (id: Photo): Promise<void> => {
    const { data, status } = await request.delete(`/photos/${id}`);
    if (status === 200) {
      fetchPhotoData();
    } else {
      console.log(data.message);
      // setValidation(data.message);
    }
  };

  useEffect(() => {
    // if (user) {
    //   if (user.accessLevel === 1) {
    fetchPhotoData();
    fetchThemesData();
    //   }
    // } else return;
  }, []);

  return (
    <StoreContext.Provider
      value={{
        currentPhoto,
        editMode,
        fetchPhotoData,
        fetchThemesData,
        handleClose,
        handleModalContent,
        isModalActive,
        modalContent,
        photoDelete,
        photos,
        photosCache,
        setCurrentPhoto,
        setEditMode,
        setIsModalActive,
        setModalContent,
        setPhotos,
        setThemes,
        setUser,
        themes,
        user,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const StoreContext = createContext<any>(StoreProvider);

export default StoreProvider;
