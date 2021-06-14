import React, { createContext, useEffect, useState } from "react";

import request from "../helpers/request";

const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [themes, setThemes] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({
    isAddEditPhotoActive: false,
    isAddEditThemeActive: false,
    isEditPhotoActive: false,
    isDisplayPhotoActive: false,
    isLoginFormActive: false,
  });

  const fetchPhotoData = async () => {
    const { data } = await request.get("/photos");
    setPhotos(data.photos);
  };

  const fetchThemesData = async () => {
    const { data } = await request.get("/themes");
    setThemes(data.themes);
  };

  const handleClose = () => setIsModalActive(false);

  const handleModalContent = (property) => {
    if (user) {
      setUser(null);
    } else {
      setIsModalActive(true);
    }

    let switchModalTemp = {
      isAddEditPhotoActive: false,
      isAddEditThemeActive: false,
      isDisplayPhotoActive: false,
      isLoginFormActive: false,
    };
    switchModalTemp.[property] = true; // prettier-ignore
    setModalContent(switchModalTemp);
  };

  const photoDelete = async (id) => {
    const { data, status } = await request.delete(`/photos/${id}`);
    if (status === 200) {
      fetchPhotoData();
    } else {
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

export const StoreContext = createContext(StoreProvider);

export default StoreProvider;
