import React from "react";
import { Button } from "components/Button";
import { Trans, useTranslation } from "react-i18next";
import rules1 from "../../assets/rules/1.png";
import rules2 from "../../assets/rules/2.png";
import rules3 from "../../assets/rules/3.png";
import rules4 from "../../assets/rules/1_en.png";
import rules5 from "../../assets/rules/2_en.png";
import rules6 from "../../assets/rules/3_en.png";
import styles from "./Rulebook.module.scss";

const rules = {
  pl: [rules1, rules2, rules3],
  en: [rules4, rules5, rules6],
}

export const Rulebook: React.FC<{ onClose(): any }> = ({ onClose }) => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <Button
          theme="pink"
          size="small"
          className={styles.close}
          onClick={onClose}
        >
          <Trans>close</Trans>
        </Button>

        <div className={styles.modalScroll}>
          {rules[i18n.language.split("-")[0]]?.map((img => (
            <img className={styles.ruleImg} src={img} alt="" />
          )))}
        </div>
      </div>
    </div>
  );
};
