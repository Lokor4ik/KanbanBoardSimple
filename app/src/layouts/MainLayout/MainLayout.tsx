import React from 'react';

import { PropsMainLayout } from './types';

import './MainLayout.scss';

const MainLayout: React.FC<PropsMainLayout> = ({ sectionName, children }) => (
  <section className={sectionName}>
    <div className="container">{children}</div>
  </section>
);

export default MainLayout;
