import _ from 'lodash';
import { ButtonHTMLAttributes } from 'react';

import style from './style.module.scss';

type DataType = {
  action?: () => void | string;
  title?: string;
  kind?: 'secondary' | 'danger';
  className?: string;
};

const Button = ({ action, title, kind = 'secondary', className, ...props }: DataType & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const handlePage = (e: React.MouseEvent<HTMLElement>) => {
    if (!props.type) {
      e.preventDefault();
    }

    const target = e.target as HTMLElement;

    const ripples = document.createElement('span');
    ripples.className = `ripple`;

    if (_.isFunction(action)) {
      action();
    }

    setTimeout(() => {
      ripples.remove();
    }, 1000);

    target.appendChild(ripples);
  };

  return (
    <button onClick={handlePage} className={`${style.button} ${style[kind]} ${className ? className : ''}`} {...props}>
      {title}
    </button>
  );
};

export default Button;
