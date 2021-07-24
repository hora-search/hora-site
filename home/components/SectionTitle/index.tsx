import React from 'react';
import c from './style.module.scss';

interface Props {
  children: React.ReactNode;
}
const SectionTitle = ({ children }: Props): JSX.Element => (
  <h2 className={c.wrapper}>{children}</h2>
);

export default SectionTitle;
