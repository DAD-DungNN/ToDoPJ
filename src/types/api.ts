/* eslint-disable @typescript-eslint/no-explicit-any */
export type APIConfig = {
  keys?: string[];
  endPoint: string;
  queryTemplateObj?: { [key: string]: string | number };
  method: 'GET' | 'PUT' | 'POST' | 'DELETE';
  factoryData?: any;
};
