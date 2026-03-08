import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type ButtonVariant = "primary" | "outline" | "ghost";

type LinkTagProps = {
  clickListener?: () => void;
  className?: string | null;
  content?: string | ReactNode;
  to: string;
  iconElement?: ReactNode | null;
  titleContent?: string | null;
  variant?: ButtonVariant;
  target?: string;
};

function LinkTag({
  clickListener,
  className,
  content,
  titleContent,
  to,
  iconElement,
  variant = "primary",
  target,
}: LinkTagProps) {
  const variantClass =
    variant === "primary"
      ? styles.btnPrimary
      : variant === "outline"
      ? styles.btnOutline
      : styles.btnGhost;

  const isExternal = to.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={to}
        onClick={() => clickListener?.()}
        className={`${styles.btn} ${variantClass}${className ? ` ${className}` : ""}`}
        title={titleContent ?? ""}
        target={target ?? "_self"}
      >
        {iconElement}
        {content}
      </a>
    );
  }

  return (
    <Link
      to={to}
      onClick={() => clickListener?.()}
      className={`${styles.btn} ${variantClass}${className ? ` ${className}` : ""}`}
      title={titleContent ?? ""}
    >
      {iconElement}
      {content}
    </Link>
  );
}

export default LinkTag;
