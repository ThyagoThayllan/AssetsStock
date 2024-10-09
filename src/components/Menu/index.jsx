import styles from "./styles.module.css";

export const Menu = () => {
  return (
    <div className={styles.container}>
      <h1>Assets Stock</h1>

      <nav>
        <ul>
          <li>
            <a href="#">Início</a>
          </li>
          <li>
            <a href="#">Contato</a>
          </li>
          <li>
            <a href="#">Sobre</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
