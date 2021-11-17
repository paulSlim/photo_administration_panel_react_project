export type EditMode = boolean;

export interface FilterTheme {
  label: string;
  value: string;
}

export type FilteredWord = string;

export type ModalActive = boolean;

export interface ModalContent {
  isAddEditPhotoActive: boolean;
  isAddEditThemeActive: boolean;
  isEditPhotoActive: boolean;
  isDisplayPhotoActive: boolean;
  isLoginFormActive: boolean;
}

export interface Photo {
  fileAddress: string;
  id: string;
  title: string;
  description: string;
  keywords: string[];
  theme: string;
}

export interface Theme {
  themeName: string;
  id: string;
}

export interface User {
  accessLevel: number;
  login: string;
  password: string;
}

export type Validation = string;

// export type ContextProps = {
// currentPhoto: Photo;
// editMode: EditMode;
// fetchPhotoData: Promise<void>;
// fetchThemesData: Promise<void>;
// handleClose: void;
// handleModalContent: void;
// isModalActive: boolean;
// modalContent: ModalContent;
// photoDelete: Promise<void>
// photos: Photo[];
// setCurrentPhoto: ,
//         setEditMode,
//         setIsModalActive,
//         setModalContent,
//         setPhotos,
//         setThemes,
//         setUser,
//         themes,
//         user,
// }
