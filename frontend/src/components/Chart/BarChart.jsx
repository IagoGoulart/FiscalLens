import styles from "./BarChart.module.css";

/**
 * data: [{ label, value, tone }]
 * tone: success | warning | danger | info | neutral
 */
export default function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={styles.wrap}>
      <div className={styles.chart} role="img" aria-label="Distribuição da análise">
        {data.map((item) => {
          const heightPct = (item.value / max) * 100;
          return (
            <div key={item.label} className={styles.col}>
              <div className={styles.value}>{item.value}</div>
              <div className={styles.track}>
                <div
                  className={`${styles.fill} ${styles[item.tone || "neutral"]}`}
                  style={{ height: `${heightPct}%` }}
                />
              </div>
              <div className={styles.label}>{item.label}</div>
            </div>
          );
        })}
      </div>

      <div className={styles.caption}>
        Base: <strong>250</strong> registros analisados no período
      </div>
    </div>
  );
}