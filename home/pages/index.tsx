/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';

import NavBar from '../components/NavBar';
import BigTitle from '../components/BigTitle';
import Features from '../components/Features';
import Installation from '../components/Installation';

import c from '../styles/home.module.scss';

const Home = (): JSX.Element => {
  return (
    <div>
      <NavBar />
      <div className={c.wrapper}>
        <BigTitle />
        <Features />
        <Installation />
      </div>
    </div>
  );
};

export default React.memo(Home);
