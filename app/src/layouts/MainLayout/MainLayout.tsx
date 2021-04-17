import React from 'react';

import { PropsMainLayout } from './types';

import './MainLayout.scss';

const MainLayout: React.FC<PropsMainLayout> = ({ sectionName, children }) => (
  <main className="main">
    <section className={sectionName}>
      <div className="container">{children}</div>
    </section>
  </main>
);

export default MainLayout;
