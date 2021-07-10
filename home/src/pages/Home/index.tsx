/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';

import BigTitle from './sections/BigTitle';
import Features from './sections/Features';
import Installation from './sections/Installation';

import c from './style.module.scss';

const Home = (): JSX.Element => {
  return (
    <div className={c.wrapper}>
      <BigTitle />
      <Features />
      <Installation />
    </div>
  );
};

export default React.memo(Home);
