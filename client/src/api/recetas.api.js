import axios from "axios";

export const getRecetasRequest = async () =>
  await axios.get("http://localhost:4000/recetas");

export const createRecetaRequest = async (receta) =>
  await axios.post("http://localhost:4000/recetas", receta);

export const deleteRecetaRequest = async (id) =>
  await axios.delete(`http://localhost:4000/recetas/${id}`);

export const getRecetaRequest = async (id) =>
  await axios.get(`http://localhost:4000/recetas/${id}`);

export const updateRecetaRequest = async (id, newFields) =>
  await axios.put(`http://localhost:4000/recetas/${id}`, newFields);

export const toggleRecetaDoneRequest = async (id, done) =>
  await axios.put(`http://localhost:4000/recetas/${id}`, {
    done,
  });