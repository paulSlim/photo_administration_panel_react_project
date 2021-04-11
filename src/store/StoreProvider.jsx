import React, { createContext, useEffect, useState } from 'react';

import request from '../helpers/request';

const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);

  const [isModalActive, setIsModalActive] = useState(false);
  const [modalContent, setModalContent] = useState({
    isLoginFormActive: false,
    isAddPhotoActive: false,
  });

  const fetchPhotoData = async () => {
    const { data } = await request.get('/photos');

    setPhotos(data.photos);
  };

  const handleClose = () => setIsModalActive(false);

  const handleOnClickLogin = (property) => {
    if (user) {
      setUser(null);
    } else {
      setIsModalActive(true);
    }

    let switchModalTemp = {
      isLoginFormActive: false,
      isAddPhotoActive: false,
    };
    switchModalTemp.[property] = true;
    setModalContent(switchModalTemp);
  }

  useEffect(() => {
    // if (user) {
    //   if (user.accessLevel === 1) {
    fetchPhotoData();
    //   }
    // } else return;
  }, []);



  return (
    <StoreContext.Provider value={{
      user,
      setUser,
      photos,
      setPhotos,
      fetchPhotoData,
      isModalActive,
      setIsModalActive,
      modalContent,
      setModalContent,
      handleClose,
      handleOnClickLogin
    }}>
      {children}
    </StoreContext.Provider>
  )
};

export const StoreContext = createContext(StoreProvider);

export default StoreProvider;