/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';
import c from './style.module.scss';

const links: { text: string; href: string }[] = [
  { text: 'GitHub', href: 'https://github.com' },
  { text: 'Documentation', href: '/documentation' },
];

const NavBar = (): JSX.Element => {
  return (
    <div className={c.wrapper}>
      <div className={c.title}>
        <div className={c.logo} />
        Hora Search
      </div>
      <div className={c.linksWrapper}>
        {links.map(({ text, href }) => (
          <a href={href}>{text}</a>
        ))}
      </div>
    </div>
  );
};

export default React.memo(NavBar);
