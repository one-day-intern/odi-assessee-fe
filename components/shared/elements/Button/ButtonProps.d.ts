import { ReactNode, CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  style?: CSSProperties;
  type?: "button" | "submit" | "reset";
  rest?: any;
}
