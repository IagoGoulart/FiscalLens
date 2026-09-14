import { ExternalLink } from "lucide-react";
import styles from "./ReferenceCard.module.css";

export default function ReferenceCard({ titulo, orgao, assunto, relevancia, link }) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.orgao}>{orgao}</span>
      </div>

      <h4 className={styles.titulo}>{titulo}</h4>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Assunto</span>
        <p className={styles.fieldValue}>{assunto}</p>
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>Relevância</span>
        <p className={styles.fieldValue}>{relevancia}</p>
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Consultar fonte oficial
          <ExternalLink size={13} strokeWidth={1.75} />
        </a>
      )}
    </div>
  );
}