export const Products = ({ products }) => {
  return (
    <div>
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
          <tr>
            <td>Nitro 5 7º</td>
            <td>Acer</td>
            <td>Notebook</td>
            <td>
              Funcionário utilizando: Thyago Thayllan. Setor: Desenvolvimento
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
