import LogoSvg from "assets/svg/logo.svg?react";
import classNames from "classnames";

interface Props {
  size: "small" | "medium" | "large" | "tiny";
  className?: string;
}

export const Logo: React.FC<Props> = ({ size, className, ...props }) => {
  const sizeClass =
    size === "large"
      ? "w-[37.5em]"
      : size === "medium"
      ? "w-[20em]"
      : size === "small"
      ? "w-[8.4375em]"
      : "w-[6.25em]";
  return (
    <LogoSvg
      className={classNames("text-pink", sizeClass, className)}
      {...props}
    />
  );
};
