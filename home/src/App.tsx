/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React, { Suspense, lazy } from 'react';

import NavBar from './components/NavBar';

import c from './App.module.scss';

const Main = lazy(() => import('./pages/Home'));

interface Props {}
const App = (props: Props): JSX.Element => {
  return (
    <div>
      <NavBar />
      <div className={c.container}>
        <Suspense fallback={<div>Loading…</div>}>
          <Main />
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(App);
