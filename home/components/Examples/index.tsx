import React, { useEffect, useMemo, useState } from 'react';
import hljs from 'highlight.js';
import classnames from 'classnames';

import c from './style.module.scss';

const languageExamples: { language: string; lines: string[] }[] = [
  {
    language: 'Python',
    lines: `import numpy as np
from hora import HNSWIndex
        
dimension = 50
n = 1000
index = HNSWIndex(dimension, "usize")
samples = np.float32(np.random.rand(n, dimension))
for i in range(0, len(samples)):
    index.add(np.float32(samples[i]), i)
index.build("euclidean")
target = np.random.randint(0, n)
print("{} has neighbors: {}".format(target, index.search(samples[target], 10))) # 631 has neighbors: [631, 656, 113, 457, 584, 179, 586, 979, 619, 976]
    `.split('\n'),
  },
  {
    language: 'Rust',
    lines: `use hora::core::ann_index::ANNIndex;
use rand::{thread_rng, Rng};
use rand_distr::{Distribution, Normal};

pub fn demo() {
    let n = 1000;
    let dimension = 64;

    // make sample points
    let mut samples = Vec::with_capacity(n);
    let normal = Normal::new(0.0, 10.0).unwrap();
    for _i in 0..n {
        let mut sample = Vec::with_capacity(dimension);
        for _j in 0..dimension {
            sample.push(normal.sample(&mut rand::thread_rng()));
        }
        samples.push(sample);
    }

    let mut index = hora::index::hnsw_idx::HNSWIndex::<f32, usize>::new(
        dimension,
        &hora::index::hnsw_params::HNSWParams::<f32>::default(),
    ); // init index
    for (i, sample) in samples.iter().enumerate().take(n) {
        index.add(sample, i).unwrap(); // add point
    }
    index.build(hora::core::metrics::Metric::Euclidean).unwrap();

    let mut rng = thread_rng();
    let target: usize = rng.gen_range(0..n);
    println!(
        "{:?} has neighbors: {:?}",
        target,
        index.search(&samples[target], 10) // search for k nearest neighbors
    ); // 523 has neighbors: [523, 762, 364, 268, 561, 231, 380, 817, 331, 246]
}
    `.split('\n'),
  },
];

const Example = (): JSX.Element => {
  const [activeLanguage, setActiveLanguage] = useState(languageExamples[0]!.language);

  const curExample = useMemo(
    () => languageExamples.find((example) => example.language === activeLanguage),
    [activeLanguage]
  );

  useEffect(() => {
    hljs.highlightAll();
  }, [curExample]);

  return (
    <div className={c.wrapper}>
      <h2 className={c.title}>Examples</h2>
      <div className={c.content}>
        <div className={c.languageSwitcher}>
          {languageExamples.map(({ language }) => {
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
            {curExample.lines.map((line, index) => (
              <code key={index} className={classnames(c.codeLine, `language-${curExample.language}`)}>
                {line}
              </code>
            ))}
          </pre>
          <button
            className={c.copyBtn}
            onClick={() => navigator.clipboard.writeText(curExample.lines.join('\n'))}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Example);
