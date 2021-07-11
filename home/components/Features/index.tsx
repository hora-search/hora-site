/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';
import c from './style.module.scss';

const features: { title: string; desc: string; img?: string }[] = [
  {
    title: 'Portable 💼',
    desc: <ul>
            <li><em>no_std</em> support (in the future, not full support)</li>
            <li><em>Windows</em>, <em>Linux</em> and <em>OS X</em> Support</li>
            <li><em>IOS</em> and <em>Android</em> Support (WIP)</li>
            <li><strong>without</strong> any heavy library, such as BLAS</li>
          </ul>,
  },
  {
    title: 'Security 🔒 and Productive ⭐',
    desc: <ul>
            <li>rust compiler guarantee all code</li>
            <li>language lib like <em>Python lib</em>, the memory is managed by the Rust</li>
            <li>great testing coverage</li>
            <li>well documented</li>
            <li>elegant and simple API, which is extremely easy to learn</li>
          </ul>,
  },
  {
    title: 'Performant ⚡️',
    desc: <ul>
            <li><strong>SIMD-Accelerated (<em>packed_simd</em>)</strong></li>
            <li><strong>Stable Algorithm Implementation</strong></li>
            <li><strong>Multiple Threads Design</strong></li>
          </ul>,
  },
  {
    title: 'Multiple Languages Support☄️',
    desc: <ul>
            <li>Rust</li>
            <li>Python</li>
            <li>Nodejs</li>
            <li>Java</li>
            <li>Golang(WIP)</li>
            <li>Swift(WIP)</li>
            <li>Julia(WIP)</li>
            <li>R(WIP)</li>
          </ul>,
  },
  {
    title: 'Multiple Indexes Support 🚀',
    desc: <ul>
            <li>Hierarchical Navigable Small World Graph Index(HNSW)</li>
            <li>Satellite System Graph (SSG)</li>
            <li>Product Quantization Inverted File(PQIVF)</li>
            <li>Random Projection Tree(RPT)</li>
            <li>BruteForce (naive implementation with SIMD)</li>
          </ul>,
  },
  {
    title: 'Multiple Distances Support 🧮',
    desc: <ul>
            <li>Dot Product Distance</li>
            <li>Euclidean Distance</li>
            <li>Manhattan Distance</li>
            <li>Cosine Similarity</li>
          </ul>,
  },
];

const FEATURE_ROW = 2;
const FEATURE_COUNT_ONE_ROW = Math.ceil(features.length / FEATURE_ROW);
const FEATURE_WIDTH_PERCENT = 99 / FEATURE_COUNT_ONE_ROW;
const FEATURE_MARGIN = 20;

const Features = (): JSX.Element => {
  return (
    <div className={c.wrapper}>
      <h2 className={c.title}>Features</h2>
      <div className={c.featureList} style={{ marginRight: -FEATURE_MARGIN }}>
        {features.map(({ title, desc, img }) => (
          <div
            key={title}
            className={c.card}
            style={{ width: `calc(${FEATURE_WIDTH_PERCENT}% - ${FEATURE_MARGIN}px)` }}
          >
            {img && <div className={c.cardImg} style={{ backgroundImage: `url(${img})` }} />}
            <div className={c.cardDetail}>
              <h3 className={c.cardTitle}>{title}</h3>
              <p className={c.cardDesc}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Features);
