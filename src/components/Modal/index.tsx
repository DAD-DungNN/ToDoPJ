import Button from 'components/Buttons';
import React from 'react';

import style from './style.module.scss';

export type Props = {
  children?: React.ReactNode;
  title?: string;
  show: boolean;
  close: () => void;
};

const Modal = ({ show, close, children, title }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <div className={style.modal} onClick={close}>
      <div className={style.modal__container} onClick={(e) => e.stopPropagation()}>
        <div className={style.modal__container__header}>
          <h2 className={style.modal__container__header__title}>{title}</h2>
          <Button title="x" action={close} />
        </div>
        <div className={style.modal__container__body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
