import { useContext, useState } from "react";

import { StoreContext } from "../store/StoreProvider";

import BulkOperationsPanelItem from "./BulkoOperationsPanelItem";

import request from "../helpers/request";
import style from "./BulkOperationsPanel.module.scss";

interface BulkOperationsPanelProps {
  setShowPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const BulkOperationsPanel: React.FC<BulkOperationsPanelProps> = ({
  setShowPanel,
}) => {
  const {
    fetchPhotoData,
    selectedPhotoIds,
    setSelectedPhotoIds,
    setValidation,
  } = useContext(StoreContext);

  const deselectAllPhotos = (): void => {
    setSelectedPhotoIds([]);
    setShowPanel(false);
  };

  const deleteSelectedPhotos = async (): Promise<void> => {
    const photosIds = [...selectedPhotoIds];

    const { data, status } = await request.delete("/photos", {
      data: photosIds,
    });
    if (status === 200) {
      setSelectedPhotoIds([]);
      setShowPanel(false);
      fetchPhotoData();
    } else {
      setValidation(data.message);
    }
  };

  return (
    <div className={style["bulk-operations-panel"]}>
      <BulkOperationsPanelItem callback={deselectAllPhotos}>
        Odznacz
      </BulkOperationsPanelItem>
      <BulkOperationsPanelItem callback={deleteSelectedPhotos}>
        Usuń
      </BulkOperationsPanelItem>
    </div>
  );
};

export default BulkOperationsPanel;
