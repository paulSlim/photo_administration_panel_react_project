import { createContext, useEffect, useState } from "react";

import {
  EditMode,
  FilterTheme,
  ModalActive,
  ModalContent,
  Photo,
  Theme,
  User,
  Validation,
} from "../data.types/StoreProvider";

import request from "../helpers/request";

const StoreProvider = ({ children }: any): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photosCache, setPhotosCache] = useState<Photo[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [editMode, setEditMode] = useState<EditMode>(false);
  const [filteredWord, setFilteredWord] = useState("");
  const [isModalActive, setIsModalActive] = useState<ModalActive>(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    isAddEditPhotoActive: false,
    isAddEditThemeActive: false,
    isEditPhotoActive: false,
    isDisplayPhotoActive: false,
    isLoginFormActive: false,
  });
  const [themeFilters, setThemeFilters] = useState<FilterTheme[]>([]);
  const [validation, setValidation] = useState<Validation>("");

  const displayFilteredPhotos = () => {
    let filteredPhotos = photosCache;

    if (themeFilters.length > 0) {
      filteredPhotos = filteredPhotos.filter((photo) =>
        themeFilters.some((theme) => theme.label === photo.theme)
      );
    }

    if (filteredWord) {
      filteredPhotos = filteredPhotos.filter((photo) =>
        // let array = [...photo.keywords];
        // array.push(photo.title);
        // console.log(array);

        // return array.some((word) => word.includes(filteredWord));
        // // Object.values(photo).some((word) => word.includes(filteredWord))
        // //   photo.title.toLowerCase().includes(filteredWord)
        // // // );
        photo.keywords.some((word) => word.toLowerCase().includes(filteredWord))
      );
    }

    setPhotos(filteredPhotos);
  };

  const fetchPhotoData = async (): Promise<void> => {
    const { data } = await request.get("/photos");
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
      setValidation(data.message);
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

  useEffect(() => {
    displayFilteredPhotos();
  }, [photosCache]);

  return (
    <StoreContext.Provider
      value={{
        currentPhoto,
        displayFilteredPhotos,
        editMode,
        fetchPhotoData,
        fetchThemesData,
        filteredWord,
        handleClose,
        handleModalContent,
        isModalActive,
        modalContent,
        photoDelete,
        photos,
        photosCache,
        setCurrentPhoto,
        setEditMode,
        setFilteredWord,
        setIsModalActive,
        setModalContent,
        setPhotos,
        setThemes,
        setThemeFilters,
        setUser,
        setValidation,
        themes,
        themeFilters,
        user,
        validation,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const StoreContext = createContext<any>(StoreProvider);

export default StoreProvider;
