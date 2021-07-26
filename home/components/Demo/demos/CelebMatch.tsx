import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';

// import { mockCelebRandom, mockCelebSearch } from './mocks';
import c from './celeb.style.module.scss';

interface Pic {
  pic_name: string;
  pic_url: string;
}

const CelebMatch = (): JSX.Element => {
  const [choices, setChoices] = useState<Pic[]>([]);
  const [activeChoice, setActiveChoice] = useState<Pic['pic_name']>('');

  const fetchChoices = async () => {
    try {
      const resp = await fetch(`/demos/celebrity_random`);
      // const resp = { json: () => Promise.resolve(mockCelebRandom) };
      const json = await resp.json();
      setChoices(json.resp);
    } catch {}
  };

  useEffect(() => {
    fetchChoices();
  }, []);

  const rerandomChoices = () => {
    setChoices([]);
    setActiveChoice('');
    fetchChoices();
  };

  const [results, setResults] = useState<Pic[]>([]);

  const refCurReqId = useRef({});
  useEffect(() => {
    if (!activeChoice) {
      return;
    }

    (async () => {
      const thisReqId = {};
      refCurReqId.current = thisReqId;

      const testIsCurReq = () => refCurReqId.current === thisReqId;

      try {
        const resp = await fetch(`/demos/celebrity_search?query=${activeChoice}`);
        // const resp = { json: () => Promise.resolve(mockCelebSearch) };
        if (!testIsCurReq()) {
          return;
        }
        const json = await resp.json();
        setResults(json.resp);
      } catch {
        if (!testIsCurReq()) {
          return;
        }
      }
    })();
  }, [activeChoice]);

  return (
    <div>
      <div className={c.section}>
        <h2 className={c.title}>Choose one celebrity below…</h2>
        <div className={c.imgWrapper}>
          {choices.map(({ pic_name, pic_url }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={pic_name}
              className={classnames(c.clickableImg, { [c.activeImg]: activeChoice === pic_name })}
              src={pic_url}
              alt={pic_name}
              onClick={() => setActiveChoice(pic_name)}
            />
          ))}
        </div>
        <div className={c.rerandomWrapper}>
          <button className={c.rerandomBtn} onClick={rerandomChoices}>
            Re-random celebrities
          </button>
        </div>
      </div>
      {activeChoice && (
        <div className={c.section}>
          <h2 className={c.title}>Match Result</h2>
          <div className={c.imgWrapper}>
            {results.map(({ pic_name, pic_url }) => (
              <img key={pic_name} src={pic_url} alt={pic_name} /> // eslint-disable-line @next/next/no-img-element
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CelebMatch;
