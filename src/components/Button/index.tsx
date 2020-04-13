import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import style from "./style.module.scss";

export interface ButtonProps {
  theme?: "pink" | "yellow" | "blue";
}

export const Button: React.FC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick, className, theme = "pink", ...props }) => {
  return (
    <button
      className={classNames(style.button, style[`button--${theme}`], className)}
      {...props}
    />
  );
};
