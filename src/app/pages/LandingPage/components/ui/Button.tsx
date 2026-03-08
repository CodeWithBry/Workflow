import { ReactNode } from "react";
import styles from "./styles.module.css";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = {
  clickListener: () => void;
  className?: string | null;
  content?: string | ReactNode;
  iconElement?: ReactNode | null;
  titleContent?: string | null;
  id?: string;
  variant?: ButtonVariant;
};

function Button({
  clickListener,
  className,
  content,
  iconElement,
  titleContent,
  id,
  variant = "primary",
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? styles.btnPrimary
      : variant === "outline"
      ? styles.btnOutline
      : styles.btnGhost;

  return (
    <button
      id={id}
      title={titleContent ?? ""}
      onClick={() => clickListener()}
      className={`${styles.btn} ${variantClass}${className ? ` ${className}` : ""}`}
    >
      {iconElement}
      {content}
    </button>
  );
}

export default Button;
