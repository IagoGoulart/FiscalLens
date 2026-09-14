import styles from "./EmptyState.module.css";

export default function EmptyState({ title, description, icon: Icon }) {
  return (
    <div className={styles.wrap}>
      {Icon && <Icon size={28} strokeWidth={1.5} className={styles.icon} aria-hidden="true" />}
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  );
}