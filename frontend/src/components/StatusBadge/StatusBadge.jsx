import styles from "./StatusBadge.module.css";

// tone: success | warning | danger | info | neutral
export default function StatusBadge({ tone = "neutral", children }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}