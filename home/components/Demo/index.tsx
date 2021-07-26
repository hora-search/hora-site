import React, { useMemo, useState } from 'react';

import SectionTitle from '../SectionTitle';
import WineSearch from './demos/WineSearch';
import CelebMatch from './demos/CelebMatch';
import c from './style.module.scss';

interface DemoConfig {
  key: string;
  title: string;
  Comp: React.ComponentType<{}>;
}
const demoConfigs: DemoConfig[] = [
  { key: 'celebrity', title: 'Celebrity Match', Comp: CelebMatch },
  { key: 'wine', title: 'Wine Search', Comp: WineSearch },
];

const Demo = (): JSX.Element => {
  const [activeDemo, setActiveDemo] = useState<DemoConfig['key']>(demoConfigs[0].key);

  const curDemo = useMemo(
    () => demoConfigs.find((config) => config.key === activeDemo),
    [activeDemo]
  );

  return (
    <div className={c.wrapper}>
      <SectionTitle>Demos</SectionTitle>
      <div className={c.content}>
        <nav className={c.nav}>
          <ul>
            {demoConfigs.map(({ key, title }) => (
              <li
                key={key}
                className={key === activeDemo ? c.activeItem : ''}
                onClick={() => setActiveDemo(key)}
              >
                {title}
              </li>
            ))}
          </ul>
        </nav>
        <div className={c.showcase}>
          <curDemo.Comp />
        </div>
      </div>
    </div>
  );
};

export default Demo;
