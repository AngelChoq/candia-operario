import axios from "axios";
import {SERVER_IP} from "../fake-db/myip";

export const getRecetasInsumosRequest = async () =>
  await axios.get(`http://${SERVER_IP}:4000/recetas_insumos`);

export const createRecetaInsumoRequest = async (receta) =>
  await axios.post(`http://${SERVER_IP}:4000/recetas_insumos`, receta);

export const deleteRecetaInsumoRequest = async (id) =>
  await axios.delete(`http://${SERVER_IP}:4000/recetas_insumos/${id}`);

export const getRecetaInsumoRequest = async (id) =>
  await axios.get(`http://${SERVER_IP}:4000/recetas_insumos/${id}`);

export const getRecetaInsumoListRequest = async (id) =>
  await axios.get(`http://${SERVER_IP}:4000/recetas-insumos-list/${id}`);

export const updateRecetaInsumoRequest = async (id, newFields) =>
  await axios.put(`http://${SERVER_IP}:4000/recetas_insumos/${id}`, newFields);

export const toggleRecetaInsumoDoneRequest = async (id, done) =>
  await axios.put(`http://${SERVER_IP}:4000/recetas_insumos/${id}`, {
    done,
  });