import { Button } from "components/Button";
import React from "react";
import { Trans } from "react-i18next";
import rules1 from "../../assets/rules/1.png";
import rules2 from "../../assets/rules/2.png";
import rules3 from "../../assets/rules/3.png";
import styles from "./Rulebook.module.scss";

export const Rulebook: React.FC<{ onClose(): any }> = ({ onClose }) => {
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
          <img className={styles.ruleImg} src={rules1} alt="" />
          <img className={styles.ruleImg} src={rules2} alt="" />
          <img className={styles.ruleImg} src={rules3} alt="" />
        </div>
      </div>
    </div>
  );
};
