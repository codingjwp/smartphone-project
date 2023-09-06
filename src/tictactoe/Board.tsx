import styles from './board.module.css';
import Square from './Square';

export default function Board() {
  return (
    <>
      <div className={styles.boardRow}>
        <Square />
        <Square />
        <Square />
      </div>
      <div className={styles.boardRow}>
        <Square />
        <Square />
        <Square />
      </div>
      <div className={styles.boardRow}>
        <Square />
        <Square />
        <Square />
      </div>

    </>
  )
}