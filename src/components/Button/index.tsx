import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import style from "./style.module.scss";

export interface ButtonProps {
  theme?: "pink" | "yellow" | "blue";
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, theme = "pink", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={classNames(style.button, style[`button--${theme}`], className)}
      {...props}
    />
  );
});
