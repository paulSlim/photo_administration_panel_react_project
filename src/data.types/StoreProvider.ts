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
  isBulkEditFormActive: boolean;
}

export interface Photo {
  fileAddress: string;
  id: string;
  title: string;
  description: string;
  keywords: string[];
  theme: string;
}

export interface SelectedPhotos {
  id: string;
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

export interface ContextProps {
  currentPhoto: Photo | null;
  displayFilteredPhotos: () => void;
  editMode: EditMode;
  fetchPhotoData: () => Promise<void>;
  fetchThemesData: () => Promise<void>;
  filteredWord: FilteredWord;
  handleClose: () => void;
  handleModalContent: (property: string) => void;
  isModalActive: ModalActive;
  modalContent: ModalContent;
  photoDelete: (id: string) => Promise<void>;
  photos: Photo[];
  photosCache: Photo[];
  selectedPhotoIds: SelectedPhotos[];
  setCurrentPhoto: React.Dispatch<React.SetStateAction<Photo | null>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setFilteredWord: React.Dispatch<React.SetStateAction<string>>;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent: React.Dispatch<React.SetStateAction<ModalContent>>;
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  setSelectedPhotoIds: React.Dispatch<React.SetStateAction<SelectedPhotos[]>>;
  setThemes: React.Dispatch<React.SetStateAction<Theme[]>>;
  setThemeFilters: React.Dispatch<React.SetStateAction<FilterTheme[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setValidation: React.Dispatch<React.SetStateAction<string>>;
  themes: Theme[];
  themeFilters: FilterTheme[];
  user: User | null;
  validation: Validation;
}
