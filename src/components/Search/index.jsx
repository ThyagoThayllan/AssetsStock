import { useState } from "react";
import styles from "./styles.module.css";

export const Search = ({ categorys }) => {
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");

  const [filter, setFilter] = useState("");

  return (
    <div className={styles.container}>
      <h1>Buscar produto</h1>

      <div className={styles.search}>
        <div className={styles.filter}>
          <h3>Filtrar por:</h3>

          <div className={styles.actions}>
            <button value={"model"} onClick={(e) => setFilter(e.target.value)}>
              Modelo
            </button>
            <button
              value={"category"}
              onClick={(e) => setFilter(e.target.value)}
            >
              Categoria
            </button>
          </div>
        </div>

        <form className={styles.searchForm}>
          {filter === "model" && (
            <div>
              <label htmlFor="model">Modelo:</label>
              <input
                type="text"
                placeholder="Busque pelo modelo..."
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
          )}

          {filter === "category" && (
            <div className={styles.categorys}>
              <label htmlFor="category">Categoria:</label>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Selecionar</option>
                {categorys.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>
          )}

          {filter !== "" && <button>Buscar</button>}
        </form>
      </div>
    </div>
  );
};
