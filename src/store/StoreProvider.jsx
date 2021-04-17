import React, { createContext, useEffect, useState } from 'react';

import request from '../helpers/request';

const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [themes, setThemes] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({
    isAddPhotoActive: false,
    isEditPhotoActive: false,
    isDisplayPhotoActive: false,
    isLoginFormActive: false,
  });

  const fetchPhotoData = async () => {
    const { data } = await request.get('/photos');
    setPhotos(data.photos);
  };

  const fetchThemesData = async () => {
    const { data } = await request.get('/themes');
    setThemes(data.themes);
  }

  const handleClose = () => setIsModalActive(false);
  
  const handleOnClickLogin = (property) => {
    if (user) {
      setUser(null);
    } else {
      setIsModalActive(true);
    }

    let switchModalTemp = {
      isAddPhotoActive: false,
      isDisplayPhotoActive: false,
      isLoginFormActive: false,
    };
    switchModalTemp.[property] = true;
    setModalContent(switchModalTemp);
  }

  const photoDelete = async (id) => {
    const { data, status } = await request.delete(
      `/photos/${id}`,
    );
    if (status === 200) {
      fetchPhotoData();
    } else {
      setValidation(data.message);
    }
  }

  useEffect(() => {
    // if (user) {
    //   if (user.accessLevel === 1) {
    fetchPhotoData();
    fetchThemesData();
    //   }
    // } else return;
  }, []);



  return (
    <StoreContext.Provider value={{
      currentPhoto,
      editMode,
      fetchPhotoData,
      isModalActive,
      handleClose,
      handleOnClickLogin,
      photoDelete,
      modalContent,
      photos,
      setCurrentPhoto,
      setEditMode,
      setIsModalActive,
      setModalContent,
      setPhotos,
      setUser,
      user,
    }}>
      {children}
    </StoreContext.Provider>
  )
};

export const StoreContext = createContext(StoreProvider);

export default StoreProvider;