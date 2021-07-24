import React from 'react';
import c from './style.module.scss';
import pic from '../../public/fashion-mnist-784-euclidean_10_euclidean.png';
import Image from 'next/image';

const Bench = (): JSX.Element => (
  <div className={c.wrapper}>
    <h2 className={c.title}>Benchmark</h2>
    <div className={c.container_wrapper}>
      <div className={c.container}>
        <p className={c.instrument}>
          aws t2.medium (CPU: Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz)
        </p>
      </div>
      <div className={c.img_container}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={c.bench_img} src={pic.src} alt="benchmark" />
      </div>
    </div>
  </div>
);

export default React.memo(Bench);