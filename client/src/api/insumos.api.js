import axios from "axios";
import {SERVER_IP} from "../fake-db/myip";

export const getInsumosRequest = async () =>
  await axios.get(`http://${SERVER_IP}:4000/insumos`);

export const createInsumoRequest = async (insumo) =>
  await axios.post(`http://${SERVER_IP}:4000/insumos`, insumo);

export const deleteInsumoRequest = async (id) =>
  await axios.delete(`http://${SERVER_IP}:4000/insumos/${id}`);

export const getInsumoRequest = async (id) =>
  await axios.get(`http://${SERVER_IP}:4000/insumos/${id}`);

export const getInsumosRecetaRequest = async (receta_id) =>
  await axios.get(`http://${SERVER_IP}:4000/insumos-receta/${receta_id}`);

export const updateInsumoRequest = async (id, newFields) =>
  await axios.put(`http://${SERVER_IP}:4000/insumos/${id}`, newFields);

export const toggleInsumoDoneRequest = async (id, done) =>
  await axios.put(`http://${SERVER_IP}:4000/insumos/${id}`, {
    done,
  });