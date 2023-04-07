import Container from 'components/Container';
import React from 'react';

import style from './style.module.scss';

export type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className={style.layout}>
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
