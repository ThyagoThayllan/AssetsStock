import styles from "./styles.module.css";

export const Products = ({ products }) => {
  return (
    <div className={styles.container}>
      <h1>Tabela de Produtos</h1>

      <table>
        <caption>Tabela de produtos</caption>

        <thead>
          <tr>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Notebook</th>
            <th>Mensagem</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.model}</td>
              <td>{product.manufacturer}</td>
              <td>{product.category}</td>
              <td>{product.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
