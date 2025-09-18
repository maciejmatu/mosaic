import React, { InputHTMLAttributes } from "react";
import classNames from "classnames";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  type = "text",
  className,
  ...props
}) => {
  return (
    <input
      className={classNames(
        "rounded-[.625em] border-0 px-[2.625em] py-[.75em] text-center text-[1.25em] font-medium text-black outline-none shadow-inner",
        "bg-[rgba(178,100,210,0.8)] placeholder-[rgba(178,100,210,0.7)] placeholder:text-[1.125em] placeholder:font-medium",
        className
      )}
      type={type}
      {...props}
    />
  );
};
