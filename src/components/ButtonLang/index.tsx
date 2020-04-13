import React from "react";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../../i18n";
import "./style.scss";

export const ButtonLang = () => {
  const { i18n } = useTranslation();

  return (
    <div className="Lang">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          className={cn(
            "Lang__button",
            i18n.language.split("-")[0] === lang && "Lang__button--active"
          )}
          onClick={() => {
            i18n.changeLanguage(lang);
            window.location.reload();
          }}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};
