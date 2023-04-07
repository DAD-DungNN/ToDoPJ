import Button from 'components/Buttons';
import React from 'react';

import style from './style.module.scss';

export type Props = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  confirmMsg?: string;

  onClose?: () => void;
  onConfirm?: () => void;
};

const Card = ({ title, description, children, onClose, onConfirm, confirmMsg = 'Confirm' }: Props) => {
  return (
    <div className={style.card}>
      <div className={style.card__header}>
        <h4 className={style.card__header__title}>{title}</h4>
        <Button title="-" kind="danger" className={style.card__header__closeBtn} action={onClose} />
      </div>
      <p className={style.card__description}>{description}</p>
      {children}
      <div className={style.card__button}>
        <Button title={confirmMsg} action={onConfirm} />
      </div>
    </div>
  );
};

export default Card;
