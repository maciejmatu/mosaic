import * as React from "react";
import { useStoreState, useStoreActions } from "../../store";
import { useState } from "react";
import { ButtonBack } from "../ButtonBack";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "components/Button";
import { LobbyPage, SmallLogo } from "components/LobbyPage";
import { ButtonLang } from "components/ButtonLang";
import { Input } from "components/Input";

export const SetupNickname: React.FC<{ onSubmit?: () => void }> = ({
  onSubmit,
}) => {
  const initialNickname = useStoreState((s) => s.nickname);
  const persistNickname = useStoreActions((s) => s.setNickname);
  const [nickname, setNickname] = useState(initialNickname || "");
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    persistNickname(nickname);
    onSubmit && onSubmit();
  };

  return (
    <LobbyPage>
      <ButtonBack to="/create" />
      <ButtonLang />
      <SmallLogo />

      <h3 className="page-title">
        <Trans>Set your nickname</Trans>
      </h3>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center">
        <Input
          placeholder={t("Type in something cool...")}
          className="w-[20rem]"
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
        />

        <Button type="submit" className="mt-4">
          <Trans>Save</Trans>
        </Button>
      </form>
    </LobbyPage>
  );
};
