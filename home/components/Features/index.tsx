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
          Support <em>no_std</em> (WIP, not all features)
        </li>
        <li>
          Support <em>Windows</em>, <em>Linux</em> and <em>OS X</em>
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
          Memory managed by Rust for all language libs such as <em>Python lib</em>
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
            SIMD-Accelerated (<em>packed_simd</em>)
          </strong>
        </li>
        <li>
          <strong>Stable algorithm implementation</strong>
        </li>
        <li>
          <strong>Multiple threads design</strong>
        </li>
      </ul>
    ),
  },
  {
    title: 'Multiple Languages Support☄️',
    desc: (
      <ul>
        <li>Rust</li>
        <li>Python</li>
        <li>Nodejs</li>
        <li>Java</li>
        <li>Golang(WIP)</li>
        <li>Swift(WIP)</li>
        <li>Julia(WIP)</li>
        <li>R(WIP)</li>
      </ul>
    ),
  },
  {
    title: 'Multiple Indexes Support 🚀',
    desc: (
      <ul>
        <li>Hierarchical Navigable Small World Graph Index(HNSW)</li>
        <li>Satellite System Graph (SSG)</li>
        <li>Product Quantization Inverted File(PQIVF)</li>
        <li>Random Projection Tree(RPT)</li>
        <li>BruteForce (naive implementation with SIMD)</li>
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
