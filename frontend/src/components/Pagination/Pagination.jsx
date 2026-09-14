import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.wrap}>
      <span className={styles.info}>
        Exibindo <strong>{start}–{end}</strong> de <strong>{totalItems}</strong>
      </span>

      <div className={styles.controls}>
        <button
          className={styles.navBtn}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} strokeWidth={1.75} />
        </button>

        {pages.map((p) => (
          <button
            key={p}
            className={`${styles.pageBtn} ${p === currentPage ? styles.active : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}

        <button
          className={styles.navBtn}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          <ChevronRight size={16} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}