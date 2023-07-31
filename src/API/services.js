import { requestData } from "./request";

export const getAll = (slug) => requestData.get(slug);
export const getById = (slug, id) => requestData.get(`${slug}/${id}`);
export const deleteById = (slug, id) => requestData.delete(`${slug}/${id}`);
export const create = (slug, body) => requestData.post(`${slug}`, body);
export const update = (slug, id, body) =>
  requestData.put(`${slug}/${id}`, body);
