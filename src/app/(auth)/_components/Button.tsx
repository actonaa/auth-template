import { ReactNode } from "react";

type PropsButton = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  className: string;
  children: ReactNode;
  disabled?: boolean;
};

export default function Button({
  type,
  onClick,
  className,
  children,
  disabled,
}: PropsButton) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
