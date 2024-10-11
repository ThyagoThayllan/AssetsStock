import styles from "./styles.module.css";

export const EditModal = ({ modal }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>Editar</h2>

        <form>
          <div>
            <label htmlFor="model">Modelo:</label>
            <input type="text" name="model" placeholder="Digite o modelo..." />
          </div>
          <div>
            <label htmlFor="marca">Marca:</label>
            <input type="text" name="marca" placeholder="Digite a marca..." />
          </div>
          <div>
            <label htmlFor="category">Categoria:</label>
            <select name="category">
              <option value="">Selecionar</option>
            </select>
          </div>
          <div>
            <label htmlFor="note">Nota:</label>
            <textarea name="note" placeholder="Nota sobre o item..."></textarea>
          </div>

          <button className={styles.button}>Editar</button>
        </form>

        <button
          className={styles.closeButton}
          onClick={() => modal.setModalOpened(!modal.setModalOpened)}
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
};
