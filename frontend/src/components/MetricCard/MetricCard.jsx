import styles from "./MetricCard.module.css";

// accent: neutral | success | warning | danger
export default function MetricCard({ label, value, hint, accent = "neutral" }) {
  const formatted =
    typeof value === "number" ? value.toLocaleString("pt-BR") : value;

  return (
    <div className={`${styles.card} ${styles[accent]}`}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        <span className={styles.dot} aria-hidden="true" />
      </div>
      <div className={styles.value}>{formatted}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
    </div>
  );
}