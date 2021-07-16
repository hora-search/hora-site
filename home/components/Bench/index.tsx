import React from 'react';
import c from './style.module.scss';
import pic from '../../public/fashion-mnist-784-euclidean_10_euclidean.png';
import Image from 'next/image'

const Bench = (): JSX.Element => {
    console.log(pic);
    return (
        <div className={c.wrapper}>
            <h2 className={c.title}>Benchmark</h2>
            <div className={c.container_wrapper}>
                <div className={c.container}>
                    <p className={c.instrument}>aws t2.medium (CPU: Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz)</p>
                </div>
                <div className={c.img_container}>
                    {/* <img className={c.img} src={pic.src} /> */}
                    {/* <Image
                        src={pic.src}
                        alt="benchmark"
                        // layout='responsive'
                        width={1190}
                        height={778}
                    /> */}
                    <div className={c.bench_img}></div>
                </div>

            </div>

        </div>
    );
};

export default React.memo(Bench);
