/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';
import Script from 'next/script';

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
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZCQDT118MM" />
      <Script>{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-ZCQDT118MM');
          `}</Script>
    </div>
  );
};

export default React.memo(Home);
