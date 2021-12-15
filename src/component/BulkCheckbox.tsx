import { useContext, useEffect, useRef, useState } from "react";
import style from "./PhotoElmnt.module.scss";
import { SelectedPhotos } from "../data.types/StoreProvider";
import { StoreContext } from "../store/StoreProvider";

interface BulkCheckboxProps {
  id: string;
  selectPhoto: (idObject: SelectedPhotos) => void;
  deselectPhoto: (idObject: SelectedPhotos) => void;
}

const BulkCheckbox: React.FC<BulkCheckboxProps> = ({
  id,
  selectPhoto,
  deselectPhoto,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const { selectedPhotoIds } = useContext(StoreContext);

  const isInitialMount = useRef(true);

  const manageSelection = () => {
    if (isChecked) {
      selectPhoto({ id });
    } else if (!isChecked) {
      deselectPhoto({ id });
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      manageSelection();
    }
  }, [isChecked]);

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    } else {
      if (selectedPhotoIds.length <= 0) {
        setIsChecked(false);
      }
    }
  }, [selectedPhotoIds]);

  return (
    <input
      className={style["photo-card__bulk-checkbox"]}
      type="checkbox"
      checked={isChecked}
      onChange={(e) => setIsChecked(!isChecked)}
    />
  );
};

export default BulkCheckbox;
