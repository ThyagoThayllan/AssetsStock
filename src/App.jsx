import { useState } from "react";
import axios from "axios";
import { Menu } from "./components/Menu";
import { Products } from "./components/Products";
import { NewProduct } from "./components/NewProduct";
import { Search } from "./components/Search";
import styles from "./styles.module.css";

export const App = () => {
  const [action, setAction] = useState("");

  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const [products, setProducts] = useState([]);

  const productData = {
    model,
    manufacturer,
    category,
    note,
  };
  const productFunctions = {
    setModel,
    setManufacturer,
    setCategory,
    setNote,
  };

  const categorys = [
    "Computadores e Dispositivos Pessoais",
    "Servidores",
    "Dispositivos de Rede",
    "Periféricos",
    "Equipamentos de Armazenamento",
    "Dispositivos de Segurança",
    "Equipamentos de Virtualização",
    "Acessórios",
    "Dispositivos Móveis",
    "Impressoras e Scanners",
    "Monitores e Telas",
    "Componentes de Hardware",
    "Fontes de Energia e UPS",
    "Licenças de Software",
    "Equipamentos de Videoconferência",
  ].sort();

  const changeAction = (value) => {
    setAction(value);
  };

  //  Definição da URL base
  axios.defaults.baseURL = "http://localhost:80/back/";

  const getProducts = async () => {
    try {
      const res = await axios.get("?action=search");
      const data = res.data;

      setProducts(data);
    } catch (error) {
      console.error(`Erro: ${error}`);
    }
  };

  const deleteAsset = async (id, assets, setState) => {
    await axios
      .delete(`?action=delete/:id`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: { id },
      })
      .then((res) => {
        console.log(res);

        const filteredAssets = assets.filter((assets) => assets.id !== id);
        setState(filteredAssets);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.container}>
      <Menu />

      <div className={styles.mainContainer}>
        <div className={styles.actions}>
          <button
            value={"products"}
            onClick={(e) => {
              changeAction(e.target.value);
              getProducts();
            }}
          >
            Tabela de produtos
          </button>
          <button
            value={"register"}
            onClick={(e) => changeAction(e.target.value)}
          >
            Novo produto
          </button>
          <button
            value={"search"}
            onClick={(e) => changeAction(e.target.value)}
          >
            Buscar produto
          </button>
        </div>

        <div className={styles.form}>
          {action === "" && <h1>Bem vindo!</h1>}
          {action === "products" && (
            <Products
              products={products}
              deleteAsset={deleteAsset}
              getProducts={getProducts}
              setProducts={setProducts}
            />
          )}
          {action === "register" && (
            <NewProduct
              categorys={categorys}
              product={productData}
              productFunctions={productFunctions}
            />
          )}
          {action === "search" && <Search categorys={categorys} deleteAsset={deleteAsset} />}
        </div>
      </div>
    </div>
  );
};
