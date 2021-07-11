/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React, { useState } from 'react';
import c from './style.module.scss';

const languageGuides: { language: string; lines: string[] }[] = [
  {
    language: 'Java',
    lines: ["import HS from 'hora-search';", 'HS.calc();'],
  },
  {
    language: 'Python',
    lines: ["from 'hora-search' import hs"],
  },
  {
    language: 'C',
    lines: ['#include <hora-search.h>;'],
  },
];

const Installation = (): JSX.Element => {
  const [activeLanguage, setActiveLanguage] = useState(languageGuides[0]!.language);

  const curCodeLines =
    languageGuides.find((guide) => guide.language === activeLanguage)?.lines || [];

  return (
    <div className={c.wrapper}>
      <h2 className={c.title}>Installation</h2>
      <div className={c.languageShowcase}>
        <div className={c.languageSwitcher}>
          {languageGuides.map(({ language }) => {
            const isActive = activeLanguage === language;
            return (
              <label
                key={language}
                className={`${c.switcherItem} ${isActive ? c.activeLanguage : ''}`}
              >
                <input
                  checked={isActive}
                  onChange={() => setActiveLanguage(language)}
                  type="radio"
                />
                {language}
              </label>
            );
          })}
        </div>
        <pre className={c.codeShowcase}>
          {curCodeLines.map((line, index) => (
            <code key={index} className={c.codeLine}>
              {line}
            </code>
          ))}
          <button
            className={c.copyBtn}
            onClick={() => navigator.clipboard.writeText(curCodeLines.join('\n'))}
          >
            Copy
          </button>
        </pre>
      </div>
    </div>
  );
};

export default React.memo(Installation);
