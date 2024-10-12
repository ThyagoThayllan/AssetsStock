import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { EditModal } from "../EditModal";
import { Asset } from "../Asset";

export const Search = ({
  categorys,
  deleteAsset,
  modal,
  setSelectedAsset,
  selectedAsset,
  editAsset,
  action,
}) => {
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");

  const [assets, setAssets] = useState([]);

  const getAsset = async (filter, asset) => {
    const res = await axios.get(`?action=search&${filter}=${asset}`);
    const data = res.data;

    setAssets(data);
  };

  return (
    <div className={styles.container}>
      <h1>Buscar ativo</h1>

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
          onSubmit={(e) => {
            e.preventDefault();

            getAsset(filter, filter === "model" ? model : category);
          }}
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
          {assets.map(({ id, model, manufacturer, category, note }) => (
            <div key={id}>
              <table>
                <tbody>
                  <tr>
                    <td>{model}</td>
                    <td>{manufacturer}</td>
                    <td>{category}</td>
                    <td>{note}</td>
                    <td>
                      <button
                        className={styles.edit}
                        onClick={() => {
                          modal.setModalOpened(!modal.modalOpened);
                          setSelectedAsset({
                            id,
                            model,
                            manufacturer,
                            category,
                            note,
                          });
                        }}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className={styles.delete}
                        onClick={() => deleteAsset(id, assets, setAssets)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {modal.modalOpened && (
                <EditModal
                  key={id}
                  modal={modal}
                  categorys={categorys}
                  selectedAsset={selectedAsset}
                  editAsset={editAsset}
                  getAsset={getAsset}
                  action={action}
                  filter={filter}
                  modelData={model}
                  categoryData={category}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>Nenhum ativo pesquisado</h3>
        </div>
      )}
    </div>
  );
};
