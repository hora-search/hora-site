/*
 * @Create: By Jiaxin.She on 2021-05-29.
 * @Description: Component
 */

import React from 'react';
import c from './style.module.scss';

const links: { text: string; href: string }[] = [
  { text: 'GitHub', href: 'https://github.com/hora-search/hora' },
  { text: 'Document', href: '/doc' },
];

const NavBar = (): JSX.Element => {
  return (
    <div className={c.wrapper}>
      <div className={c.title} title="Hora search everywhere!">
        <div className={c.logo} />
        Hora Search
      </div>
      <div className={c.linksWrapper}>
        {links.map(({ text, href }) => (
          <a key={text} className={c.link} href={href}>{text}</a>
        ))}
      </div>
    </div>
  );
};

export default React.memo(NavBar);
