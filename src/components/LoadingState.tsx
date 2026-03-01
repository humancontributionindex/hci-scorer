import styles from "./LoadingState.module.css";

export default function LoadingState() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Analyzing your text against five HCI dimensions
        <span className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
      </p>
      <p className={styles.estimate}>This typically takes 10&ndash;15 seconds.</p>
    </div>
  );
}
