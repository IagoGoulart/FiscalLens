import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Info,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const NAV_ITEMS = [
  { key: "dashboard",  label: "Dashboard",         icon: LayoutDashboard, to: "/" },
  { key: "registros",  label: "Registros Fiscais", icon: FileText,        to: "/registros" },
  { key: "relatorios", label: "Relatórios",        icon: BarChart3,       to: "/relatorios" },
  { key: "sobre",      label: "Sobre o projeto",   icon: Info,            to: "/sobre" },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>FL</div>
        <div>
          <div className={styles.brandName}>FiscalLens</div>
          <div className={styles.brandTag}>Fiscal Analytics</div>
        </div>
      </div>

      <nav className={styles.nav}>
        <span className={styles.navLabel}>Navegação</span>
        {NAV_ITEMS.map(({ key, label, icon: Icon, to }) => (
          <NavLink
            key={key}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <Icon className={styles.icon} size={16} strokeWidth={1.75} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.envBadge}>Protótipo</div>
        <div className={styles.envText}>Dados fictícios — Janeiro/2026</div>
      </div>
    </aside>
  );
}