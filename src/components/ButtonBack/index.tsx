import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { Trans } from "react-i18next";

export const ButtonBack: React.FC<{ to: string }> = ({ to }) => {
  return (
    <Link to={to} className="ButtonBack">
      ↤ <Trans>Back</Trans>
    </Link>
  );
};
