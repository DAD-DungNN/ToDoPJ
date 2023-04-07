import { taskResDTO } from 'dto/response/task';

import { client } from './axios';

export const getTasks = (): Promise<taskResDTO[]> => {
  return client.get(`data`);
};

export const createTask = (data: taskResDTO) => {
  return client.post(`data`, data);
};

export const deleteTask = (id: string) => {
  return client.delete(`data/${id}`);
};

export const updateTask = (data: taskResDTO) => {
  return client.put(`data/${data.id}`, data);
};

export const updateTasks = (data: taskResDTO[]) => {
  return client.put(`data`, data);
};
