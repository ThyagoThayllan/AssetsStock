import styles from "./styles.module.css";

export const Products = ({ products, deleteAsset, setProducts }) => {
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
            <th>Ação</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.model}</td>
                <td>{product.manufacturer}</td>
                <td>{product.category}</td>
                <td>{product.note}</td>
                <td>
                  <button className={styles.edit} title="Editar">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className={styles.delete}
                    title="Deletar"
                    onClick={() => {
                      deleteAsset(product.id, products, setProducts);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Nenhum produto cadastrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
