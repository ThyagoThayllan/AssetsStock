import { useState } from "react";
import styles from "./styles.module.css";

export const NewProduct = ({ categorys }) => {
  const [registered, setRegistered] = useState(false);

  return (
    <div>
      <h1>Novo Produto</h1>

      <form>
        <div className={styles.divForm}>
          <label htmlFor="model">Modelo:</label>
          <input
            type="text"
            name="model"
            placeholder="Digite o modelo do produto..."
          />
        </div>
        <div className={styles.divForm}>
          <label htmlFor="manufacturer">Fabricante:</label>
          <input
            type="text"
            name="manufacturer"
            placeholder="Digite o fabricante do produto..."
          />
        </div>
        <div className={styles.divForm}>
          <label htmlFor="category">Categoria:</label>
          <select name="category">
            <option value="">Selecionar</option>
            {categorys.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className={styles.divForm}>
          <label htmlFor="notes">Nota:</label>
          <textarea
            name="note"
            placeholder="Nota sobre o produto..."
          ></textarea>
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

      {model && <p>{model}</p>}
      {manufacturer && <p>{manufacturer}</p>}
      {category && <p>{category}</p>}
      {note && <p>{note}</p>}
    </div>
  );
};
