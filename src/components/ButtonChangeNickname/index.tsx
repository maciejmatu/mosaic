import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export const ButtonChangeNickname = () => {
  return (
    <Link to="/nickname" className="ButtonChangeNickname">
      Change Nickname
    </Link>
  );
};
