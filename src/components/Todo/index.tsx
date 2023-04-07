import Button from 'components/Buttons';
import Modal from 'components/Modal';
import { taskResDTO } from 'dto/response/task';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { deleteTask, getTasks } from 'services/task';
import { StatusType } from 'types/status';

import Card from '../Card';
import CreateTask from './CreateTask';
import ListTask from './ListTask';
import style from './style.module.scss';
import UpdateTask from './UpdateTask';

export type modalType = {
  type: 'create' | 'update';
  title: string;
};

const TodoComponent = () => {
  const [show, setShow] = useState<boolean>(false);
  const [listTask, setListTask] = useState<taskResDTO[]>([]);
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const [task, setTask] = useState<taskResDTO>(new taskResDTO());
  const [modalType, setmodalType] = useState<modalType>({
    type: 'create',
    title: 'Create new task',
  });

  useEffect(() => {
    if (isFetchData) {
      setShow(false);

      async function fetchData() {
        try {
          const response = await getTasks();
          if (response) {
            setListTask(response);
          }
        } catch (error) {}
      }
      fetchData();
      setIsFetchData(false);
    }
  }, [isFetchData]);

  async function handleDeleteTask(task: taskResDTO) {
    try {
      const res = await deleteTask(task.id);

      if (res) {
        setIsFetchData(true);
      }
    } catch (error) {}
  }

  function getTaskListByStatus(status: StatusType) {
    const listTaskFilter = listTask.filter((item) => {
      return item.statusTask === status;
    });

    const listTaskRender = listTaskFilter.map((item, index) => {
      return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided) => (
            <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={style.toDo__body__list__item}>
              <Card
                title={item.title}
                description={item.description}
                onClose={() => handleDeleteTask(item)}
                confirmMsg="update"
                onConfirm={() =>
                  setModalByType(
                    {
                      type: 'update',
                      title: 'Update task',
                    },
                    item
                  )
                }
              />
            </li>
          )}
        </Draggable>
      );
    });

    return <ListTask status={status}>{listTaskRender}</ListTask>;
  }

  function setModalByType(data: modalType, task?: taskResDTO) {
    if (task) {
      setTask((prev) => {
        return {
          ...prev,
          ...task,
        };
      });
    }

    setmodalType((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
    setShow(true);
  }

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const listTaskSource = listTask.filter((item) => item.statusTask === source.droppableId);
    const listTaskDes = listTask.filter((item) => item.statusTask === destination.droppableId);

    //cập nhật trạng thái task
    const draggedTask = listTaskSource[source.index];
    const newStatus = destination.droppableId;
    const updatedTask = { ...draggedTask, statusTask: newStatus };

    //cắt task khỏi mảng
    const draggedTaskIndex = listTask.indexOf(draggedTask);
    const newListTask = [...listTask];
    newListTask.splice(draggedTaskIndex, 1);

    //lấy ra index cần chèn
    const destinatedIndex = newListTask.indexOf(listTaskDes[destination.index]);

    //đưa task vào index mới
    if (destinatedIndex !== -1) {
      newListTask.splice(destinatedIndex, 0, updatedTask);
    } else {
      const lastDesElement = listTaskDes[listTaskDes.length - 1];
      const indexOfLastDes = newListTask.indexOf(lastDesElement);
      newListTask.splice(indexOfLastDes + 1, 0, updatedTask);
    }

    setListTask(newListTask);
  };

  return (
    <div className={style.toDo}>
      <Modal title={modalType.title} show={show} close={() => setShow(false)}>
        {modalType.type === 'create' && <CreateTask close={() => setShow(false)} action={() => setIsFetchData(true)} />}
        {modalType.type === 'update' && <UpdateTask task={task} close={() => setShow(false)} action={() => setIsFetchData(true)} />}
      </Modal>
      <div className={style.toDo__header}>
        <h3>Projects</h3>
        <Button
          title="Create Project"
          action={() =>
            setModalByType({
              type: 'create',
              title: 'Create new task',
            })
          }
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={style.toDo__body}>
          {getTaskListByStatus(StatusType.NEW)}
          {getTaskListByStatus(StatusType.INPROCESS)}
          {getTaskListByStatus(StatusType.DONE)}
          {getTaskListByStatus(StatusType.ClOSED)}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TodoComponent;
