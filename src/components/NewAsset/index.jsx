import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

export const NewAsset = ({ categorys, asset, assetFunctions }) => {
  const [registered, setRegistered] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const registerAsset = async (e) => {
    e.preventDefault();

    if (
      asset.model.trim() === "" ||
      asset.manufacturer.trim() === "" ||
      asset.category.trim() === ""
    ) {
      setEmpty(true);
    } else {
      setEmpty(false);

      await axios.post("?action=register", {
        model: asset.model.trim(),
        manufacturer: asset.manufacturer.trim(),
        category: asset.category.trim(),
        note: asset.note.trim(),
      }, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);

        setRegistered(true);

        clearFormFields();
          
        setTimeout(() => {
          setRegistered(false);
        }, 2000);
      })
      .catch((error) => console.error(error));
    }
  };

  const checkFormField = () => {
    if (
      asset.model.trim() === "" ||
      asset.manufacturer.trim() === "" ||
      asset.category.trim() === ""
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const clearFormFields = () => {
    assetFunctions.setModel("");
    assetFunctions.setManufacturer("");
    assetFunctions.setCategory("");
    assetFunctions.setNote("");
  };

  useEffect(() => {
    checkFormField();
  }, [asset]);

  return (
    <div>
      <h1>Novo ativo</h1>

      <form onSubmit={(e) => registerAsset(e)}>
        <div className={styles.divForm}>
          <label htmlFor="model">Modelo:</label>
          <input
            type="text"
            name="model"
            placeholder="Digite o modelo..."
            onChange={(e) => assetFunctions.setModel(e.target.value)}
            value={asset.model}
          />
        </div>
        <div className={styles.divForm}>
          <label htmlFor="manufacturer">Fabricante:</label>
          <input
            type="text"
            name="manufacturer"
            placeholder="Digite o fabricante..."
            onChange={(e) => assetFunctions.setManufacturer(e.target.value)}
            value={asset.manufacturer}
          />
        </div>
        <div className={styles.divForm}>
          <label htmlFor="category">Categoria:</label>
          <select
            name="category"
            onChange={(e) => assetFunctions.setCategory(e.target.value)}
            value={asset.category}
          >
            <option value="">Selecionar</option>
            {categorys.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.divForm}>
          <label htmlFor="notes">
            Nota: <small>(opcional)</small>
          </label>
          <textarea
            name="note"
            placeholder="Nota..."
            onChange={(e) => assetFunctions.setNote(e.target.value)}
            value={asset.note}
          ></textarea>
        </div>

        <div>
          {empty && (
            <p className={styles.alert}>
              Preencha todos os campos necessários!
            </p>
          )}

          <button type="submit" className={styles.btn} disabled={isEmpty}>
            Cadastrar
          </button>
          <span
            className={registered ? styles.registered : styles.notRegistered}
          >
            {asset.name} Ativo cadastrado com sucesso!
          </span>
        </div>
      </form>
    </div>
  );
};
