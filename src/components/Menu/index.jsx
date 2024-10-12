import styles from "./styles.module.css";

export const Menu = ({ setAction }) => {
  return (
    <div className={styles.container}>
      <h1>Assets Stock</h1>

      <nav>
        <button value={""} onClick={(e) => setAction(e.target.value)}>
          Início
        </button>
        <button value={"assets"} onClick={(e) => setAction(e.target.value)}>
          Tabela de ativos
        </button>
        <button value={"register"} onClick={(e) => setAction(e.target.value)}>
          Novo ativo
        </button>
        <button value={"search"} onClick={(e) => setAction(e.target.value)}>
          Buscar ativo
        </button>
      </nav>
    </div>
  );
};
