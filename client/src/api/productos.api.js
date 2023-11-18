import axios from "axios";
import {SERVER_IP} from "../fake-db/myip";

export const getProductosRequest = async () =>
  await axios.get(`http://${SERVER_IP}:4000/productos`);

  export const getProductosPedidosRequest = async () =>
  await axios.get(`http://${SERVER_IP}:4000/productos-pedidos`);

export const createProductoRequest = async (producto) =>
  await axios.post(`http://${SERVER_IP}:4000/productos`, producto);

export const deleteProductoRequest = async (id) =>
  await axios.delete(`http://${SERVER_IP}:4000/productos/${id}`);

export const getProductoRequest = async (id) =>
  await axios.get(`http://${SERVER_IP}:4000/productos/${id}`);

export const updateProductoRequest = async (id, newFields) =>
  await axios.put(`http://${SERVER_IP}:4000/productos/${id}`, newFields);

export const toggleProductoDoneRequest = async (id, done) =>
  await axios.put(`http://${SERVER_IP}:4000/productos/${id}`, {
    done,
  });