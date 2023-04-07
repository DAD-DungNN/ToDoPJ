import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { StatusType } from 'types/status';

import style from './style.module.scss';

export type Props = {
  status: StatusType;
  children: React.ReactNode;
};

const ListTask = ({ status, children }: Props) => {
  return (
    <div className={style.listTask}>
      <h4 className={style.listTask__title}>{status}</h4>
      <Droppable droppableId={status}>
        {(provided: DroppableProvided) => (
          <ul ref={provided.innerRef} className={style.listTask__list}>
            {children}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default ListTask;
