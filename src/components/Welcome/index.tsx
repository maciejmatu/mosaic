import React from "react";
import { LobbyPage } from "components/LobbyPage";
import { Logo } from "components/Logo";
import { ButtonLink } from "components/Button";
import { Trans } from "react-i18next";
import style from "./style.module.scss";

export const Welcome = () => {
  return (
    <LobbyPage>
      <Logo className={style.logo} size="large" />
      <p className={style.text}>
        <Trans>
          Online multiplayer boardgame to play with all (2-4) of your friends!
          In Mosaic, you play the role of an artist arranging beautiful mosaics.
        </Trans>
      </p>
      <ButtonLink to="/create" theme="yellow">
        <Trans>Go!</Trans>
      </ButtonLink>
    </LobbyPage>
  );
};
