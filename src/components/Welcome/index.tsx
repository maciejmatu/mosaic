import { LobbyPage } from "components/LobbyPage";
import { Logo } from "components/Logo";
import { ButtonLink } from "components/Button";
import { Trans } from "react-i18next";

export const Welcome = () => {
  return (
    <LobbyPage>
      <Logo className="max-w-full" size="large" />
      <p className="lead-text">
        <Trans>
          Online multiplayer boardgame to play with all (2-4) of your friends!
          In Mosaic, you play the role of an artist arranging beautiful mosaics.
        </Trans>
      </p>
      <div className="flex gap-[.75em]">
        <ButtonLink to="/create" theme="yellow">
          <Trans>Go!</Trans>
        </ButtonLink>
        <ButtonLink to="/lobby" theme="blue">
          <Trans>Browse Rooms</Trans>
        </ButtonLink>
      </div>
    </LobbyPage>
  );
};
