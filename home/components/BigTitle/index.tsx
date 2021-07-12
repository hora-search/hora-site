/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';
import c from './style.module.scss';

const BigTitle = (): JSX.Element => {
  return (
    <div className={c.wrapper}>
      <div className={c.logo}></div>
      <p className={c.desc}>Hora search everywhere!</p>
    </div>
  );
};

export default React.memo(BigTitle);
