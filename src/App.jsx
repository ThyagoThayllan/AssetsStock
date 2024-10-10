import { useState } from "react";
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
  ];

  const changeAction = (value) => {
    setAction(value);
  };

  return (
    <div className={styles.container}>
      <Menu />

      <div className={styles.mainContainer}>
        <div className={styles.actions}>
          <button
            value={"products"}
            onClick={(e) => changeAction(e.target.value)}
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
          {action === "products" && <Products />}
          {action === "register" && (
            <NewProduct
              categorys={categorys}
              product={productData}
              productFunctions={productFunctions}
            />
          )}
          {action === "search" && <Search categorys={categorys} />}
        </div>
      </div>
    </div>
  );
};
