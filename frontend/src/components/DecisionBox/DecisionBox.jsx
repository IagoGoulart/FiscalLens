import { useState } from "react";
import { CheckCircle2, Flag } from "lucide-react";
import Button from "../Button/Button";
import styles from "./DecisionBox.module.css";

export default function DecisionBox() {
  const [decisao, setDecisao] = useState(null);

  return (
    <div className={styles.box}>
      <p className={styles.text}>
        Os resultados apresentados servem como apoio à análise. A decisão final
        deve ser realizada pelo profissional responsável.
      </p>

      {!decisao ? (
        <div className={styles.actions}>
          <Button variant="primary" size="md" onClick={() => setDecisao("confirmado")}>
            <CheckCircle2 size={14} strokeWidth={1.75} /> Confirmar ponto de atenção
          </Button>
          <Button variant="secondary" size="md" onClick={() => setDecisao("falso-positivo")}>
            <Flag size={14} strokeWidth={1.75} /> Marcar como possível falso positivo
          </Button>
        </div>
      ) : (
        <div className={styles.registered}>
          <CheckCircle2 size={16} strokeWidth={2} className={styles.registeredIcon} />
          <span>
            Decisão registrada localmente:{" "}
            <strong>
              {decisao === "confirmado" ? "ponto de atenção confirmado" : "possível falso positivo"}
            </strong>
            . Nesta etapa do protótipo, a decisão não é persistida.
          </span>
        </div>
      )}
    </div>
  );
}