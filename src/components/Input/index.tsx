import React, { InputHTMLAttributes } from "react";
import style from "./style.module.scss";
import classNames from "classnames";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  type = "text",
  className,
  ...props
}) => {
  return (
    <input
      className={classNames(style.input, className)}
      type={type}
      {...props}
    />
  );
};
