import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
}
