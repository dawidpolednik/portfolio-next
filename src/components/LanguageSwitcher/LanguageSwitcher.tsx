import React, { FC, useCallback } from 'react';
import styles from './LanguageSwitcher.module.scss';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface LanguageSwitcherProps {
  isFrostEffect: boolean;
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  isFrostEffect,
}) => {
  const { i18n } = useTranslation();

  const { push, pathname, query, asPath } = useRouter();

  const currentLanguage = i18n?.language;

  const handleChangeLanguage = useCallback(
    (isoCode: string) => {
      push({ pathname, query }, asPath, { locale: isoCode });
      i18n.changeLanguage(isoCode);
    },
    [pathname, asPath, query, push, i18n],
  );

  const renderToggleField = (
    <div className={styles.wrapper}>
      <label className={styles.toggleWrapper} htmlFor='checkbox'>
        <input
          id='checkbox'
          type='checkbox'
          checked={currentLanguage === 'en'}
          onChange={() =>
            handleChangeLanguage(currentLanguage === 'pl' ? 'en' : 'pl')
          }
          className={styles.hiddenInput}
        />
        <span className={styles.slider}></span>
      </label>
      <div
        className={`${styles.activeLanguageLabel} ${
          isFrostEffect ? styles.withLabelDarkColor : ''
        }`}
      >
        {currentLanguage?.toUpperCase()}
      </div>
    </div>
  );

  return <div className={styles.wrapper}>{renderToggleField}</div>;
};
