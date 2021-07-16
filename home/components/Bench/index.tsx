import React from 'react';
import c from './style.module.scss';
import pic from '../../public/fashion-mnist-784-euclidean_10_euclidean.png';

const Bench = (): JSX.Element => {
    console.log(pic);
    return (
        <div className={c.wrapper}>
            <h2 className={c.title}>Benchmark</h2>
            <div className={c.container_wrapper}>
                <div className={c.container}>
                    <p className={c.instrument}>aws t2.medium (CPU: Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz)</p>
                </div>
                <div className={c.container}>
                    <img className={c.img} src={pic.src} />
                </div>

            </div>

        </div>
    );
};

export default React.memo(Bench);
