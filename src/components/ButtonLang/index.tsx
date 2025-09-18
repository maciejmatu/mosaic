import cn from "classnames";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "../../i18n";

export const ButtonLang = () => {
  const { i18n } = useTranslation();

  return (
    <div className="absolute top-[2.5em] right-[3.75em] flex gap-2">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          className={cn(
            "cursor-pointer border-0 bg-transparent block text-[.875em] text-white opacity-70 hover:opacity-100",
            i18n.language.split("-")[0] === lang && "underline opacity-100"
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
