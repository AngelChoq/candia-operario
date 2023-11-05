import axios from "axios";

export const getProductosRequest = async () =>
  await axios.get("http://localhost:4000/productos");

export const createProductoRequest = async (producto) =>
  await axios.post("http://localhost:4000/productos", producto);

export const deleteProductoRequest = async (id) =>
  await axios.delete(`http://localhost:4000/productos/${id}`);

export const getProductoRequest = async (id) =>
  await axios.get(`http://localhost:4000/productos/${id}`);

export const updateProductoRequest = async (id, newFields) =>
  await axios.put(`http://localhost:4000/productos/${id}`, newFields);

export const toggleProductoDoneRequest = async (id, done) =>
  await axios.put(`http://localhost:4000/productos/${id}`, {
    done,
  });