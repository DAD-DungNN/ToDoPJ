import React from 'react';

import style from './style.module.scss';

export type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  return <div className={style.wrapper}>{children}</div>;
}

export default Container;
