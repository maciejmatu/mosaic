import desktopImg from "assets/svg/desktop.svg";
import { GithubLink, LobbyPage } from "components/LobbyPage";
import { Logo } from "components/Logo";
import React, { HTMLAttributes } from "react";
import { Trans } from "react-i18next";
import style from "./style.module.scss";

export const MobileCover: React.FC<HTMLAttributes<HTMLDivElement>> = () => {
  return (
    <LobbyPage className={style.mobileCover}>
      <GithubLink />
      <Logo className={style.logo} size="medium" />
      <img className={style.image} src={desktopImg} alt="" />

      <p className={style.text}>
        <Trans>
          Mosaic Game is only available on the desktop. Sorry for the
          inconvenience{" "}
          <span role="img" aria-hidden>
            😔
          </span>
        </Trans>
      </p>
    </LobbyPage>
  );
};
