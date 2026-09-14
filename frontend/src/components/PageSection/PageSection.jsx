import SectionHeader from "../SectionHeader/SectionHeader";
import styles from "./PageSection.module.css";

export default function PageSection({ title, description, action, children, className }) {
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <SectionHeader title={title} description={description} action={action} />
      {children}
    </section>
  );
}