import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export const ButtonBack: React.FC<{ to: string }> = ({ to }) => {
  return (
    <Link to={to} className="ButtonBack">
      ↤ Back
    </Link>
  );
};
