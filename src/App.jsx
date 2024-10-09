import { useState } from "react";
import { Menu } from "./components/Menu";
import { Products } from "./components/Products";
import { NewProduct } from "./components/NewProduct";
import { Search } from "./components/Search";
import styles from "./styles.module.css";

export const App = () => {
  const [action, setAction] = useState("");

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
          {action === "register" && <NewProduct />}
          {action === "search" && <Search />}
        </div>
      </div>
    </div>
  );
};
