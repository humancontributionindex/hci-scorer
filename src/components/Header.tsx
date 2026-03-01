import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>Human Contribution Index</p>
      <h1 className={styles.title}>Preliminary HCI Assessment</h1>
      <p className={styles.subtitle}>
        An open-source framework for evaluating authentic human intellectual
        contribution in research
      </p>
      <hr className={styles.rule} />
    </header>
  );
}
