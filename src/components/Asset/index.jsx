import { EditModal } from "../EditModal";
import styles from "./styles.module.css";

export const Asset = ({
  deleteAsset,
  id,
  model,
  manufacturer,
  category,
  note,
  setAssets,
  assets,
  modal,
  categorys,
  setSelectedAsset,
  selectedAsset,
  editAsset,
  getAssets,
  action
}) => {
  return (
    <tr>
      <td>{model}</td>
      <td>{manufacturer}</td>
      <td>{category}</td>
      <td>{note}</td>
      <td>
        <button
          className={styles.edit}
          title="Editar"
          onClick={() => {
            modal.setModalOpened(!modal.modalOpened);
            setSelectedAsset({id, model, manufacturer, category, note})
          }}
        >
          <i className="bi bi-pencil-square"></i>
        </button>
        <button
          className={styles.delete}
          title="Deletar"
          onClick={() => {
            deleteAsset(id, assets, setAssets);

          }}
        >
          <i className="bi bi-trash"></i>
        </button>
        {modal.modalOpened && (
          <EditModal
            modal={modal}
            categorys={categorys}
            selectedAsset={selectedAsset}
            editAsset={editAsset}
            getAssets={getAssets}
            action={action}
          />
        )}
      </td>
    </tr>
  );
};
