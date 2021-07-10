/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';
import c from './style.module.scss';

const features: { title: string; desc: string; img?: string }[] = [
  {
    title: 'Productive',
    desc: 'As a language embedded in Python, Taichi has a Python-style syntax which is extremely easy to learn. Research shows Taichi programs are 10x shorter compared to equivalent C++/CUDA code while achieving higher performance.',
  },
  {
    title: 'Portable',
    desc: 'Without any code modification, a Taichi program can run on various platforms, including x64 & ARM CPUs, GPUs, web browsers and smartphones. Taichi supports Windows, Linux, and OS X.',
  },
  {
    title: 'Performant',
    desc: 'Taichi\'s Just-In-Time compiler offloads compute-intensive tasks to multi-core CPUs and massively parallel GPUs. The Taichi language design allows effective performance optimizations by the Taichi compiler.',
  },
  {
    title: 'Feature 4',
    desc: 'Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature ',
  },
  {
    title: 'Feature 5',
    desc: 'Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature ',
  },
  {
    title: 'Feature 6',
    desc: 'Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature Feature ',
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
