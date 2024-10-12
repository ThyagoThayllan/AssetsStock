import styles from "./styles.module.css";
import { Asset } from "../Asset";

export const Assets = ({
  assets,
  deleteAsset,
  setAssets,
  modal,
  categorys,
  setSelectedAsset,
  selectedAsset,
  editAsset,
  getAssets,
  action
}) => {
  return (
    <div className={styles.container}>
      <h1>Tabela de Ativos</h1>

      <table>
        <caption>Tabela de Ativos</caption>

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
          {assets.length > 0 ? (
            assets.map((asset) => (
              <Asset
                key={asset.id}
                id={asset.id}
                model={asset.model}
                manufacturer={asset.manufacturer}
                category={asset.category}
                note={asset.note}
                assets={assets}
                deleteAsset={deleteAsset}
                setAssets={setAssets}
                modal={modal}
                categorys={categorys}
                setSelectedAsset={setSelectedAsset}
                selectedAsset={selectedAsset}
                editAsset={editAsset}
                getAssets={getAssets}
                action={action}
              />
            ))
          ) : (
            <tr>
              <td colSpan={5}>Nenhum item cadastrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
