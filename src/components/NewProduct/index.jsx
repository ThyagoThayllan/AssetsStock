import { useState } from "react";
import styles from "./styles.module.css";

export const NewProduct = ({ categorys, product, productFunctions }) => {
  const [registered, setRegistered] = useState(false);

  return (
    <div>
      <h1>Novo produto</h1>

      <form>
        <div className={styles.divForm}>
          <label htmlFor="model">Modelo:</label>
          <input
            type="text"
            name="model"
            placeholder="Digite o modelo do produto..."
            onChange={(e) => productFunctions.setModel(e.target.value)}
          />
          {product.model}
        </div>
        <div className={styles.divForm}>
          <label htmlFor="manufacturer">Fabricante:</label>
          <input
            type="text"
            name="manufacturer"
            placeholder="Digite o fabricante do produto..."
            onChange={(e) => productFunctions.setManufacturer(e.target.value)}
          />
          {product.manufacturer}
        </div>
        <div className={styles.divForm}>
          <label htmlFor="category">Categoria:</label>
          <select
            name="category"
            onChange={(e) => productFunctions.setCategory(e.target.value)}
          >
            <option value="">Selecionar</option>
            {categorys.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
          {product.category}
        </div>
        <div className={styles.divForm}>
          <label htmlFor="notes">Nota:</label>
          <textarea
            name="note"
            placeholder="Nota sobre o produto..."
            onChange={(e) => productFunctions.setNote(e.target.value)}
          ></textarea>
          {product.note}
        </div>

        <div>
          <button
            type="button"
            onClick={() => setRegistered(!registered)}
            className={styles.btn}
          >
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
