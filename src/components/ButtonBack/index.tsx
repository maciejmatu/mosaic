import { Link } from "react-router-dom";
import { Trans } from "react-i18next";

export const ButtonBack: React.FC<{ to: string }> = ({ to }) => {
  return (
    <Link
      to={to}
      className="absolute top-[5.625em] left-[3.75em] text-white no-underline opacity-70 hover:opacity-100"
    >
      ↤ <Trans>Back</Trans>
    </Link>
  );
};
