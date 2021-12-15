import style from "./BulkOperationsPanelItem.module";

interface BulkOperationsPanelItemProps {
  children: Text | React.ReactNode;
  callback?: () => void;
}

const BulkOperationsPanelItem: React.FC<BulkOperationsPanelItemProps> = ({
  children,
  callback,
}) => {
  return (
    <>
      <a className={style["panel-item"]} href="#" onClick={callback}>
        {children}
      </a>
    </>
  );
};

export default BulkOperationsPanelItem;
