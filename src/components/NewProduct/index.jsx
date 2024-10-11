import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

export const NewProduct = ({ categorys, product, productFunctions }) => {
  const [registered, setRegistered] = useState(false);
  const [empty, setEmpty] = useState(false);

  const registerAsset = async (e) => {
    e.preventDefault();

    if (
      product.model === "" ||
      product.manufacturer === "" ||
      product.category === ""
    ) {
      setEmpty(true);
    } else {
      try {
        setEmpty(false);

        await axios.post(
          "?action=register",
          {
            model: product.model,
            manufacturer: product.manufacturer,
            category: product.category,
            note: product.note,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setRegistered(!registered);
        productFunctions.setModel("");
        productFunctions.setManufacturer("");
        productFunctions.setCategory("");
        productFunctions.setNote("");
      } catch (error) {
        console.error(`Erro: ${error}`);
      }
    }
  };

  return (
    <div>
      <h1>Novo produto</h1>

      <form onSubmit={(e) => registerAsset(e)}>
        <div className={styles.divForm}>
          <label htmlFor="model">Modelo:</label>
          <input
            type="text"
            name="model"
            placeholder="Digite o modelo do produto..."
            onChange={(e) => productFunctions.setModel(e.target.value)}
            value={product.model}
          />
        </div>
        <div className={styles.divForm}>
          <label htmlFor="manufacturer">Fabricante:</label>
          <input
            type="text"
            name="manufacturer"
            placeholder="Digite o fabricante do produto..."
            onChange={(e) => productFunctions.setManufacturer(e.target.value)}
            value={product.manufacturer}
          />
        </div>
        <div className={styles.divForm}>
          <label htmlFor="category">Categoria:</label>
          <select
            name="category"
            onChange={(e) => productFunctions.setCategory(e.target.value)}
            value={product.category}
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
            placeholder="Nota sobre o produto..."
            onChange={(e) => productFunctions.setNote(e.target.value)}
            value={product.note}
          ></textarea>
        </div>

        <div>
          {empty && (
            <p className={styles.alert}>
              Preencha todos os campos necessários!
            </p>
          )}

          <button type="submit" className={styles.btn}>
            Cadastrar
          </button>
          {registered && (
            <span className={registered && styles.registered}>
              PRODUTO cadastrado com sucesso!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
