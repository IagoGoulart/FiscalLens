import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import styles from "./PlaceholderPage.module.css";

export default function PlaceholderPage({ title }) {
  return (
    <div className={styles.layout}>
      <Sidebar active="registros" />
      <div className={styles.main}>
        <Header
          title={title}
          subtitle="Esta seção será implementada na próxima etapa do projeto."
        />
        <main className={styles.content}>
          <div className={styles.card}>
            <p className={styles.text}>
              Em construção. O fluxo de análise detalhada do registro será
              desenvolvido posteriormente.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}