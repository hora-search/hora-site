/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';
import SectionTitle from '../SectionTitle';
import c from './style.module.scss';

const features: { title: string; desc: React.ReactNode; img?: string }[] = [
  {
    title: 'Portable 💼',
    desc: (
      <ul>
        <li>
          Support <em>WebAssembly</em>
        </li>
        <li>
          Support <em>Windows</em>, <em>Linux</em> and <em>OS X</em>
        </li>
        <li>
          Support <em>no_std</em> (WIP, not all features)
        </li>
        <li>
          Support <em>IOS</em> and <em>Android</em>  (WIP)
        </li>
        <li>
          <strong>No</strong> heavy dependency, such as BLAS
        </li>
      </ul>
    ),
  },
  {
    title: 'Reliable and Productive ⭐',
    desc: (
      <ul>
        <li>Rust compiler secure all code</li>
        <li>
          Memory managed by Rust for all language libs such as <em>horapy</em>
        </li>
        <li>Broad testing coverage</li>
        <li>Well documented</li>
        <li>Elegant and simple API, easy to learn</li>
      </ul>
    ),
  },
  {
    title: 'Performant ⚡️',
    desc: (
      <ul>
        <li>
          <strong>
            SIMD-Accelerated (<em><a className={c.feature_link} href="https://github.com/rust-lang/packed_simd">packed_simd</a></em>)
          </strong>
        </li>
        <li>
          <strong>Stable algorithm implementation</strong>
        </li>
        <li>
          Multiple threads design
        </li>
      </ul>
    ),
  },
  {
    title: 'Multiple Languages Support✨ ',
    desc: (
      <ul>
        <li><a className={c.feature_link} href="https://github.com/hora-search/hora">Rust</a></li>
        <li><a className={c.feature_link} href="https://github.com/hora-search/horapy">Python</a></li>
        <li><a className={c.feature_link} href="https://github.com/hora-search/hora-wasm">Nodejs</a></li>
        <li><a className={c.feature_link} href="https://github.com/hora-search/hora-java">Java (WIP)</a></li>
        <li>Ruby (WIP)</li>
        <li>Golang (WIP)</li>
        <li>Swift (WIP)</li>
        <li>Julia (WIP)</li>
        <li>R (WIP)</li>
      </ul>
    ),
  },
  {
    title: 'Multiple Indexes Support 🚀',
    desc: (
      <ul>
        <li>Hierarchical Navigable Small World Graph Index (<a className={c.feature_link} href="https://arxiv.org/abs/1603.09320"><strong>HNSW</strong></a>)</li>
        <li>Satellite System Graph (<a className={c.feature_link} href="https://arxiv.org/abs/1907.06146"><strong>SSG</strong></a>)</li>
        <li>Product Quantization Inverted File (<a className={c.feature_link} href="https://lear.inrialpes.fr/pubs/2011/JDS11/jegou_searching_with_quantization.pdf"><strong>PQIVF</strong></a>)</li>
        <li>Random Projection Tree (<a className={c.feature_link} href="https://en.wikipedia.org/wiki/Random_projection"><strong>RPT</strong></a>)</li>
        <li>BruteForce (naive implementation with SIMD accelerated)</li>
      </ul>
    ),
  },
  {
    title: 'Multiple Distances Support 🧮',
    desc: (
      <ul>
        <li>Dot Product Distance</li>
        <li>Euclidean Distance</li>
        <li>Manhattan Distance</li>
        <li>Cosine Similarity</li>
      </ul>
    ),
  },
];

const Features = (): JSX.Element => {
  return (
    <div className={c.wrapper}>
      <SectionTitle>Features</SectionTitle>
      <div className={c.featureList}>
        {features.map(({ title, desc, img }) => (
          <div key={title} className={c.card}>
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
