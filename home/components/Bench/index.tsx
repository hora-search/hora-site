import React from 'react';
import Image from 'next/image';

import SectionTitle from '../SectionTitle';
import c from './style.module.scss';
import pic from '../../public/fashion-mnist-784-euclidean_10_euclidean.png';

const Bench = (): JSX.Element => (
  <div className={c.wrapper}>
    <SectionTitle>Benchmark</SectionTitle>
    <div className={c.container_wrapper}>
      <div className={c.img_container}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={c.bench_img} src={pic.src} alt="benchmark" />
      </div>
      <div className={c.container}>
        <p className={c.instrument}>
          by <strong>AWS t2.medium (CPU: Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz)</strong> [<a className={c.link} href="https://github.com/hora-search/ann-benchmarks">more info</a>]
        </p>
      </div>
    </div>
  </div>
);

export default React.memo(Bench);
