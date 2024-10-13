import { useState } from "react";
import axios from "axios";
import { Menu } from "./components/Menu";
import { Assets } from "./components/Assets";
import { NewAsset } from "./components/NewAsset";
import { Search } from "./components/Search";
import styles from "./styles.module.css";

export const App = () => {
  const [action, setAction] = useState("");

  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [assets, setAssets] = useState([]);

  const [selectedAsset, setSelectedAsset] = useState(null);

  const [modalOpened, setModalOpened] = useState(false);

  const assetData = {
    model,
    manufacturer,
    category,
    note,
  };
  const assetFunctions = {
    setModel,
    setManufacturer,
    setCategory,
    setNote,
  };

  const modal = {
    modalOpened,
    setModalOpened,
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

  const getAssets = async () => {
    try {
      const res = await axios.get("?action=search");
      const data = res.data;

      setAssets(data);
    } catch (error) {
      console.error(`Erro: ${error}`);
    }
  };

  const deleteAsset = async (id, assets, setState) => {
    await axios.delete("?action=delete/:id", {
      data: { id },
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      console.log(res);

      const filteredAssets = assets.filter((asset) => asset.id !== id);
      setState(filteredAssets);
    })
    .catch((error) => console.error(error));
  };

  const editAsset = async (id, model, manufacturer, category, note, func) => {
    await axios.put("?action=update/:id", {
      id,
      model: model.trim(),
      manufacturer: manufacturer.trim(),
      category: category.trim(),
      note: note.trim(),
    }, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => {
      console.log(res);

      setModalOpened(false);

      func();
    })
    .catch((error) => console.error(error));
  };

  return (
    <div className={styles.container}>
      <Menu setAction={setAction} />

      <div className={styles.mainContainer}>
        <div className={styles.actions}>
          <button
            value={"assets"}
            onClick={(e) => {
              changeAction(e.target.value);
              getAssets();
            }}
          >
            Tabela de ativos
          </button>
          <button
            value={"register"}
            onClick={(e) => changeAction(e.target.value)}
          >
            Novo ativo
          </button>
          <button
            value={"search"}
            onClick={(e) => changeAction(e.target.value)}
          >
            Buscar ativo
          </button>
        </div>

        <div className={styles.form}>
          {action === "" && <h1>Bem vindo!</h1>}
          {action === "assets" && (
            <Assets
              assets={assets}
              deleteAsset={deleteAsset}
              getAssets={getAssets}
              setAssets={setAssets}
              setSelectedAsset={setSelectedAsset}
              modal={modal}
              categorys={categorys}
              selectedAsset={selectedAsset}
              editAsset={editAsset}
              action={action}
            />
          )}
          {action === "register" && (
            <NewAsset
              categorys={categorys}
              asset={assetData}
              assetFunctions={assetFunctions}
            />
          )}
          {action === "search" && (
            <Search
              categorys={categorys}
              deleteAsset={deleteAsset}
              modal={modal}
              setSelectedAsset={setSelectedAsset}
              selectedAsset={selectedAsset}
              editAsset={editAsset}
              action={action}
            />
          )}
        </div>
      </div>
    </div>
  );
};
