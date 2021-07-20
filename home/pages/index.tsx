/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';
import Script from 'next/script';
import Head from 'next/head'

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Bench from '../components/Bench';
import BigTitle from '../components/BigTitle';
import Features from '../components/Features';
import Installation from '../components/Installation';
import Example from '../components/Examples';

import c from '../styles/home.module.scss';

const Header = (): JSX.Element => {
  return (
    <Head>
      <title>Hora | Hora Search Everywhere</title>
      <meta charSet="utf-8" /><meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"></meta>
      <meta data-react-helmet="true" name="keywords" content="Hora, Approximate Nearest Neighbor Search"></meta>
    </Head>
  )
}

const Home = (): JSX.Element => {
  return (
    <div>
      <Header />
      <NavBar />
      <div className={c.wrapper}>
        <BigTitle />
        <Features />
        <Installation />
        <Bench />
        <Example />
      </div>
      <Footer />
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
