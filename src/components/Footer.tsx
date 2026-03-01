import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Human Contribution Index v1.0 &mdash; Open-source framework (
        <a
          href="https://opensource.org/licenses/MIT"
          target="_blank"
          rel="noopener noreferrer"
        >
          MIT License
        </a>
        ) &mdash;{" "}
        <a
          href="https://github.com/humancontributionindex/hci-framework"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
