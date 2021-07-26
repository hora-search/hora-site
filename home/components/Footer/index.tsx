import React from 'react';
import c from './style.module.scss';

const Footer = (): JSX.Element => {
  return (
    <div className={c.wrapper}>
      {/* <div className={c.divide_wrapper}><hr className={c.divide} /></div> */}
      <div><strong><p className={c.copyright}>© Copyright 2021, hora developers.</p></strong></div>
    </div>
  );
};

export default React.memo(Footer);
