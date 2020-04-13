import React, { HTMLAttributes } from "react";
import style from "./style.module.scss";
import classNames from "classnames";
import { Logo } from "components/Logo";

export const LobbyPage: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={classNames(style.lobbyPage, className)} {...props}></div>
  );
};

export const SmallLogo = () => {
  return <Logo size="small" className={style.smallLogo} />;
};
