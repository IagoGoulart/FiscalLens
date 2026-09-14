import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import styles from "./ValidationRow.module.css";

const ICONS = {
  regular:       { Icon: CheckCircle2, tone: "success", label: "Regular" },
  atencao:       { Icon: AlertTriangle, tone: "warning", label: "Atenção" },
  inconsistente: { Icon: XCircle,      tone: "danger",  label: "Inconsistência" },
};

export default function ValidationRow({ regra, resultado, detalhe }) {
  const { Icon, tone, label } = ICONS[resultado] || ICONS.regular;

  return (
    <div className={styles.row}>
      <Icon className={`${styles.icon} ${styles[tone]}`} size={16} strokeWidth={1.75} aria-hidden="true" />
      <div className={styles.text}>
        <span className={styles.regra}>{regra}</span>
        <span className={styles.detalhe}>{detalhe}</span>
      </div>
      <span className={`${styles.badge} ${styles[tone]}`}>{label}</span>
    </div>
  );
}