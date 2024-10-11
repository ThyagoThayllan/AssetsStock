import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

export const Search = ({ categorys }) => {
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");

  const [assets, setAssets] = useState([]);

  const getProduct = async (e, filter, asset) => {
    e.preventDefault();

    const res = await axios.get(`?action=search&${filter}=${asset}`);
    const data = res.data;

    setAssets(data);
  };

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

        <form
          className={styles.searchForm}
          onSubmit={(e) =>
            getProduct(e, filter, filter === "model" ? model : category)
          }
        >
          {filter === "model" && (
            <div>
              <label htmlFor="model">Modelo:</label>
              <input
                type="text"
                placeholder="Busque pelo modelo..."
                onChange={(e) => setModel(e.target.value)}
              />

              <button type="submit" className={styles.searchBtn}>
                Buscar
              </button>
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
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <button type="submit" className={styles.searchBtn}>
                Buscar
              </button>
            </div>
          )}
        </form>
      </div>

      {assets.length > 0 ? (
        <div className={styles.assetsContainer}>
          {assets.map((asset) => (
            <table key={asset.id}>
              <tbody>
                <tr>
                  <td>{asset.manufacturer}</td>
                  <td>{asset.model}</td>
                  <td>{asset.category}</td>
                  <td>{asset.note}</td>
                  <td>
                    <button className={styles.edit}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className={styles.delete}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      ) : (
        <div>
          <h3>Nenhum produto pesquisado</h3>
        </div>
      )}
    </div>
  );
};
