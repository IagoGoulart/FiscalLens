import { Search } from "lucide-react";
import styles from "./SearchInput.module.css";

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className={styles.wrap}>
      <Search className={styles.icon} size={15} strokeWidth={1.75} aria-hidden="true" />
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}