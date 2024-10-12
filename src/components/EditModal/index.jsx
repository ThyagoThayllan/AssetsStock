import { useState } from "react";
import styles from "./styles.module.css";

export const EditModal = ({
  modal,
  categorys,
  selectedAsset,
  editAsset,
  getAssets,
  getAsset,
  action,
  filter,
  modelData,
  categoryData,
}) => {
  const [equalField, setEqualField] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const [model, setModel] = useState(selectedAsset.model);
  const [manufacturer, setManufacturer] = useState(
    selectedAsset.manufacturer
  );
  const [category, setCategory] = useState(selectedAsset.category);
  const [note, setNote] = useState(selectedAsset.note);

  const edit = () => {
    if (
      model.trim() === selectedAsset.model &&
      manufacturer.trim() === selectedAsset.manufacturer &&
      category.trim() === selectedAsset.category &&
      note.trim() === selectedAsset.note
    ) {
      setEqualField(true);
      return;
    }

    if (
      model.trim() === "" ||
      manufacturer.trim() === "" ||
      category.trim() === ""
    ) {
      setEqualField(false);
      setIsEmpty(true);
      return;
    }

    setIsEmpty(false);

    editAsset(
      selectedAsset.id,
      model,
      manufacturer,
      category,
      note,
      action === "assets"
        ? getAssets
        : () =>
            getAsset(filter, filter === "model" ? modelData : categoryData)
    );
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Editar</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            edit();
          }}
        >
          <div>
            <label htmlFor="model">Modelo:</label>
            <input
              type="text"
              name="model"
              placeholder="Digite o modelo..."
              defaultValue={selectedAsset.model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="marca">Marca:</label>
            <input
              type="text"
              name="marca"
              placeholder="Digite a marca..."
              defaultValue={selectedAsset.manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category">Categoria:</label>
            <select
              name="category"
              defaultValue={selectedAsset.category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categorys.map((category) => (
                <option defaultValue={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="note">Nota:</label>
            <textarea
              name="note"
              placeholder="Nota sobre o item..."
              defaultValue={selectedAsset.note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>

          {equalField && (
            <p style={{ color: "#f00" }}>Não há mudanças feitas.</p>
          )}
          {isEmpty && (
            <p style={{ color: "#f00" }}>
              Preencha todos os campos necessários!
            </p>
          )}

          <button type="submit" className={styles.button}>
            Editar
          </button>
        </form>

        <button
          className={styles.closeButton}
          onClick={() => modal.setModalOpened(!modal.modalOpened)}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
};
