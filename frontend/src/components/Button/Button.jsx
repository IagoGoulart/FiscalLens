import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",   // primary | secondary | ghost
  size = "md",           // sm | md
  onClick,
  type = "button",
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[variant]} ${styles[size]}`}
      {...rest}
    >
      {children}
    </button>
  );
}