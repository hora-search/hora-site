/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';
import c from './style.module.scss';

const BigTitle = (): JSX.Element => {
  return (
    <div className={c.wrapper}>
      <div className={c.content}>
        <div className={c.logo}></div>
        <div className={c.desc}>
          <h1>Hora Search</h1>
          <p>Yet another ANN implementation.</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BigTitle);
