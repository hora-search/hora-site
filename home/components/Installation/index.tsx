/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React, { useEffect, useMemo, useState } from 'react';
import hljs from 'highlight.js';
import classnames from 'classnames';

import SectionTitle from '../SectionTitle';
import c from './style.module.scss';

const languageGuides: { title: string; lang: string; lines: string[] }[] = [
  {
    title: 'Python',
    lang: 'python',
    lines: `$ pip install horapy # recommend

# or install from source
$ git clone https://github.com/hora-search/horapy && cd horapy
$ pip install maturin && maturin build --release`.split('\n'),
  },
  {
    title: 'Rust',
    lang: 'rust',
    lines: ['[dependencies]', 'hora = "0.1"'],
  },
  {
    title: 'Javascript',
    lang: 'js',
    lines: ['npm i horajs'],
  },
  {
    title: 'Build From Source',
    lang: 'bash',
    lines: ['$ git clone https://github.com/hora-search/hora', '$ cargo build'],
  },
];

const Installation = (): JSX.Element => {
  const [activeLang, setActiveLang] = useState(languageGuides[0]!.lang);

  const curGuide = useMemo(
    () => languageGuides.find((guide) => guide.lang === activeLang),
    [activeLang]
  );

  useEffect(() => {
    hljs.highlightAll();
  }, [curGuide]);

  return (
    <div className={c.wrapper}>
      <SectionTitle>Installation</SectionTitle>
      <div className={c.content}>
        <div className={c.languageSwitcher}>
          {languageGuides.map(({ title, lang }) => {
            const isActive = activeLang === lang;
            return (
              <label
                key={lang}
                className={classnames(c.switcherItem, { [c.activeLanguage]: isActive })}
              >
                <input checked={isActive} onChange={() => setActiveLang(lang)} type="radio" />
                {title}
              </label>
            );
          })}
        </div>
        <div className={c.codeShowcase}>
          <pre className={c.codeBlock}>
            {curGuide.lines.map((line, index) => (
              <code key={index} className={classnames(c.codeLine, `highlight-${curGuide.lang}`)}>
                {line}
              </code>
            ))}
          </pre>
          <button
            className={c.copyBtn}
            onClick={() => navigator.clipboard.writeText(curGuide.lines.join('\n'))}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Installation);
