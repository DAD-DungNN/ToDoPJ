import Button from 'components/Buttons';
import Form from 'components/Form';
import FormItem from 'components/FormItem';
import { taskResDTO } from 'dto/response/task';
import _ from 'lodash';
import React, { useState } from 'react';
import { updateTask } from 'services/task';
import { StatusType } from 'types/status';

import style from './style.module.scss';

export type Props = {
  task: taskResDTO;
  close: () => void;
  action: () => void;
};

const UpdateTask = ({ task, close, action }: Props) => {
  const [formData, setFormData] = useState<taskResDTO>({
    id: task.id,
    title: task.title,
    description: task.description,
    subTasks: task.subTasks,
    statusTask: task.statusTask,
  });
  const [subTask, setSubTask] = useState('');
  const handleOnchange = (data: Partial<taskResDTO>) => {
    setFormData((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  const handleSubmit = async () => {
    const cloneFormData = {
      ..._.cloneDeep(formData),
    };

    try {
      const res = await updateTask(cloneFormData);

      if (res) {
        action();
      }
    } catch (error) {}
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem title="Title">
        <input type="text" className="w-full" value={formData.title} onChange={(e) => handleOnchange({ title: e.target.value })} />
      </FormItem>
      <FormItem title="Description">
        <textarea className="w-full" rows={10} value={formData.description} onChange={(e) => handleOnchange({ description: e.target.value })} />
      </FormItem>
      <ul className="w-full">
        {formData.subTasks.map((item, index) => (
          <li key={item + index} className="py-2 flex">
            <p className="bg-background text-secondary font-bold p-2 w-full">{item}</p>
            <Button
              className={style.btnStyle}
              action={() => {
                const cloneFormDataSubtasks = [...formData.subTasks];
                cloneFormDataSubtasks.splice(index, 1);
                handleOnchange({ subTasks: cloneFormDataSubtasks });
              }}
              kind="danger"
              title="-"
            />
          </li>
        ))}
      </ul>
      <FormItem title="Subtasks">
        <div className="flex">
          <input type="text" className="w-full" value={subTask} onChange={(e) => setSubTask(e.target.value)} />
          <Button
            className={style.btnStyle}
            action={() => {
              handleOnchange({ subTasks: [...formData.subTasks, subTask] });
              setSubTask('');
            }}
            title="+"
          />
        </div>
      </FormItem>
      <FormItem title="Status">
        <select className="w-full" defaultValue={formData.statusTask} onChange={(e) => handleOnchange({ statusTask: e.target.value })}>
          <option value={StatusType.NEW}>{StatusType.NEW}</option>
          <option value={StatusType.INPROCESS}>{StatusType.INPROCESS}</option>
          <option value={StatusType.DONE}>{StatusType.DONE}</option>
          <option value={StatusType.ClOSED}>{StatusType.ClOSED}</option>
        </select>
      </FormItem>
      <div className="flex justify-between w-full">
        <Button title="Cancel" kind="danger" action={close} />
        <Button type="submit" kind="secondary" title="Update" />
      </div>
    </Form>
  );
};

export default UpdateTask;
