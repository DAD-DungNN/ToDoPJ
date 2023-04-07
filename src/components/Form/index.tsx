import React from 'react';

import style from './style.module.scss';

type Props = {
  children: React.ReactNode;
  onSubmit: () => void;
};

const Form = ({ onSubmit, children }: Props) => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      {children}
    </form>
  );
};

export default Form;
