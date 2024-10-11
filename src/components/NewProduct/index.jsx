import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

export const NewProduct = ({ categorys, product, productFunctions }) => {
  const [registered, setRegistered] = useState(false);
  const [empty, setEmpty] = useState(false);

  const registerAsset = async (e) => {
    e.preventDefault();

    if (
      product.model.trim() === "" ||
      product.manufacturer.trim() === "" ||
      product.category.trim() === ""
    ) {
      setEmpty(true);
    } else {
      try {
        setEmpty(false);

        await axios.post(
          "?action=register",
          {
            model: product.model.trim(),
            manufacturer: product.manufacturer.trim(),
            category: product.category.trim(),
            note: product.note.trim(),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setRegistered(true);

        productFunctions.setModel("");
        productFunctions.setManufacturer("");
        productFunctions.setCategory("");
        productFunctions.setNote("");

        setTimeout(() => {
          setRegistered(false);
        }, 2000);
      } catch (error) {
        console.error(`Erro: ${error}`);
      }
    }
  };

  const checkFormField = () => {
    if (
      product.model === "" ||
      product.manufacturer === "" ||
      product.category === ""
    ) {
    }
  };

  const [name, setName] = useState("");

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
            onChange={(e) => {
              productFunctions.setModel(e.target.value);
              setName(e.target.value)
            }}
            value={product.model}
          />
          <p style={{backgroundColor: '#080'}}>{name}</p>
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
          <span
            className={registered ? styles.registered : styles.notRegistered}
          >
            {product.name} Ativo cadastrado com sucesso!
          </span>
        </div>
      </form>
    </div>
  );
};
