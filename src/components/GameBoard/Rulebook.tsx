import { Button } from "components/Button";
import { Trans, useTranslation } from "react-i18next";
import rules1 from "../../assets/rules/1.png";
import rules2 from "../../assets/rules/2.png";
import rules3 from "../../assets/rules/3.png";
import rules4 from "../../assets/rules/1_en.png";
import rules5 from "../../assets/rules/2_en.png";
import rules6 from "../../assets/rules/3_en.png";

const rules = {
  pl: [rules1, rules2, rules3],
  en: [rules4, rules5, rules6],
};

export const Rulebook: React.FC<{ onClose(): any }> = ({ onClose }) => {
  const { i18n } = useTranslation();

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] z-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet px-[3.5em] py-[2.625em] rounded-[.625em] shadow-[0_0_1.25em_0_rgba(85,39,109,1)] text-white">
        <Button
          theme="pink"
          size="small"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <Trans>close</Trans>
        </Button>
        <div className="max-h-[70vh] overflow-auto">
          {rules[i18n.language.split("-")[0]]?.map((img) => (
            <img className="mb-4 max-w-full" src={img} alt="" key="img" />
          ))}
        </div>
      </div>
    </div>
  );
};
