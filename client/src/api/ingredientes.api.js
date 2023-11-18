import axios from "axios";
import {SERVER_IP} from "../fake-db/myip";

export const getIngredientesRequest = async () =>
  await axios.get(`http://${SERVER_IP}:4000/ingredientes`);

export const createIngredienteRequest = async (ingrediente) =>
  await axios.post(`http://${SERVER_IP}:4000/ingredientes`, ingrediente);

export const deleteIngredienteRequest = async (id) =>
  await axios.delete(`http://${SERVER_IP}:4000/ingredientes/${id}`);

export const getIngredienteRequest = async (id) =>
  await axios.get(`http://${SERVER_IP}:4000/ingredientes/${id}`);

export const getIngredientesRecetaRequest = async (receta_id) =>
  await axios.get(`http://${SERVER_IP}:4000/ingredientes-receta/${receta_id}`);

export const updateIngredienteRequest = async (id, newFields) =>
  await axios.put(`http://${SERVER_IP}:4000/ingredientes/${id}`, newFields);

export const toggleIngredienteDoneRequest = async (id, done) =>
  await axios.put(`http://${SERVER_IP}:4000/ingredientes/${id}`, {
    done,
  });