import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { Link, LinkProps } from "react-router-dom";

export interface ButtonProps {
  theme?: "pink" | "yellow" | "blue" | "green";
  size?: "small" | "medium";
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, theme = "pink", size = "medium", ...props }, ref) => {
  const themeClass =
    theme === "pink"
      ? "bg-pink"
      : theme === "yellow"
      ? "bg-light-yellow"
      : theme === "blue"
      ? "bg-ocean-blue"
      : "bg-green";

  const sizeClass =
    size === "small"
      ? "text-[1em] px-[1.5em] py-[0.75em]"
      : "text-[1.25em] px-[1.5em] py-[0.75em]";

  return (
    <button
      ref={ref}
      className={classNames(
        "rounded-[0.6em] flex flex-col items-center justify-center text-white font-semibold border-0 cursor-pointer transition-transform shadow-md hover:shadow-inner disabled:opacity-30 disabled:cursor-default hover:translate-x-[0.125em] hover:translate-y-[0.125em]",
        themeClass,
        sizeClass,
        className
      )}
      {...props}
    />
  );
});

export const ButtonLink: React.FC<ButtonProps & LinkProps> = ({
  className,
  theme = "pink",
  size = "medium",
  ...props
}) => {
  const themeClass =
    theme === "pink"
      ? "bg-pink"
      : theme === "yellow"
      ? "bg-light-yellow"
      : theme === "blue"
      ? "bg-ocean-blue"
      : "bg-green";

  const sizeClass =
    size === "small"
      ? "text-[1em] px-[1.5em] py-[0.75em]"
      : "text-[1.25em] px-[1.5em] py-[0.75em]";

  return (
    <Link
      className={classNames(
        "rounded-[0.6em] flex flex-col items-center justify-center text-white font-semibold border-0 cursor-pointer transition-transform shadow-md hover:shadow-inner hover:translate-x-[0.125em] hover:translate-y-[0.125em]",
        themeClass,
        sizeClass,
        className
      )}
      {...props}
    />
  );
};
