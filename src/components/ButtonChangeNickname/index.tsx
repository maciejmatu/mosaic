import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

export const ButtonChangeNickname = () => {
  return (
    <Link
      to="/nickname"
      className="fixed bottom-[2.5em] right-[3.75em] text-white no-underline opacity-70 hover:opacity-100"
    >
      <Trans>Change Nickname</Trans>
    </Link>
  );
};
