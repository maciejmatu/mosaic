import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { Trans } from "react-i18next";

export const ButtonChangeNickname = () => {
  return (
    <Link to="/nickname" className="ButtonChangeNickname">
      <Trans>Change Nickname</Trans>
    </Link>
  );
};
