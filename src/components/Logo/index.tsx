import React from "react";
import { ReactComponent as LogoSvg } from "assets/svg/logo.svg";
import "./style.scss";
import classNames from "classnames";

interface Props {
  size: "small" | "medium" | "large" | "tiny";
  className?: string;
}

export const Logo: React.FC<Props> = ({ size, className, ...props }) => {
  return (
    <LogoSvg
      className={classNames("Logo", `Logo--${size}`, className)}
      {...props}
    />
  );
};
