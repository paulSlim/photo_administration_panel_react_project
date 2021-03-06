import React, { createContext, useEffect, useState } from 'react';

import request from '../helpers/request';




const StoreProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [photos, setPhotos] = useState([]);

  const fetchPhotoData = async () => {
    const { data } = await request.get('/photos');

    setPhotos(data.photos);
  };

  useEffect(() => {
    fetchPhotoData();
  }, []);



  return (
    <StoreContext.Provider value={{
      user,
      setUser,
      photos,
      setPhotos
    }}>
      {children}
    </StoreContext.Provider>
  )
};

export const StoreContext = createContext(StoreProvider);

export default StoreProvider;