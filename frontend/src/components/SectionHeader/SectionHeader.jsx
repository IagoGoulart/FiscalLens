import styles from "./SectionHeader.module.css";

export default function SectionHeader({ title, description, action }) {
  return (
    <div className={styles.wrap}>
      <div>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}