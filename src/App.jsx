import { Menu } from "./components/Menu";
import styles from "./styles.module.css";

export const App = () => {
  return (
    <div className={styles.container}>
      <Menu />

      <div className={styles.mainContainer}>
        <div>
          <div className={styles.actions}>
            <button>Tabela de produtos</button>
            <button>Buscar produto</button>
            <button>Editar produto</button>
            <button>Deletar produto</button>
          </div>
        </div>

        <table>
          <caption>Tabela de produtos</caption>

          <tr>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Notebook</th>
            <th>Mensagem</th>
          </tr>

          <tr>
            <td>Nitro 5 7º</td>
            <td>Acer</td>
            <td>Notebook</td>
            <td>
              Funcionário utilizando: Thyago Thayllan. Setor: Desenvolvimento
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
