import styles from "./Counter.module.css";

interface CounterProps {
  count: number | null;
}

export default function Counter({ count }: CounterProps) {
  if (count === null || count <= 0) return null;

  return (
    <p className={styles.counter}>
      {count.toLocaleString()} assessment{count !== 1 ? "s" : ""} conducted
    </p>
  );
}
