/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React, { useState } from 'react';
import c from './style.module.scss';

const languageGuides: { language: string; lines: string[] }[] = [
  {
    language: 'Rust',
    lines: ['[dependencies]', 'hora = "0.1.0"'],
  },
  {
    language: 'Python',
    lines: ['$ pip install hora'],
  },
  {
    language: 'Build From Source',
    lines: ['$ git clone https://github.com/hora-search/hora', '$ cargo build'],
  },
];

const Installation = (): JSX.Element => {
  const [activeLanguage, setActiveLanguage] = useState(languageGuides[0]!.language);

  const curCodeLines =
    languageGuides.find((guide) => guide.language === activeLanguage)?.lines || [];

  return (
    <div className={c.wrapper}>
      <h2 className={c.title}>Installation</h2>
      <div className={c.content}>
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
        <div className={c.codeShowcase}>
          <pre className={c.codeBlock}>
            {curCodeLines.map((line, index) => (
              <code key={index} className={c.codeLine}>
                {line}
              </code>
            ))}
          </pre>
          <button
            className={c.copyBtn}
            onClick={() => navigator.clipboard.writeText(curCodeLines.join('\n'))}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Installation);
