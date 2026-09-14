import styles from "./ImpactCard.module.css";

const tonePorNivel = (nivel) =>
  nivel === "alto" ? "danger" : nivel === "médio" ? "warning" : "success";

export default function ImpactCard({ categoria, nivel, descricao }) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.categoria}>{categoria}</span>
        {nivel && (
          <span className={`${styles.nivel} ${styles[tonePorNivel(nivel)]}`}>
            {nivel}
          </span>
        )}
      </div>
      {descricao && <p className={styles.desc}>{descricao}</p>}
    </div>
  );
}