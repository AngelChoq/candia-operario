import { createContext, useContext, useState } from "react";
import {
  getRecetasRequest,
  deleteRecetaRequest,
  createRecetaRequest,
  getRecetaRequest,
  updateRecetaRequest,
  toggleRecetaDoneRequest,
} from "../api/recetas.api";
import { RecetaContext } from "./RecetaContext";

export const useRecetas = () => {
  const context = useContext(RecetaContext);
  if (context === undefined) {
    throw new Error("useRecetas must be used within a RecetaContextProvider");
  }
  return context;
};

export const RecetaContextProvider = ({ children }) => {
  const [recetas, setRecetas] = useState([]);

  async function loadRecetas() {
    const response = await getRecetasRequest();
    setRecetas(response.data);
  }

  const deleteReceta = async (id) => {
    try {
      const response = await deleteRecetaRequest(id);
      setRecetas(recetas.filter((receta) => receta.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createReceta = async (receta) => {
    try {
      await createRecetaRequest(receta);
      // setRecetas([...recetas, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getReceta = async (id) => {
    try {
      const response = await getRecetaRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateReceta = async (id, newFields) => {
    try {
      const response = await updateRecetaRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRecetaDone = async (id) => {
    try {
      const recetaFound = recetas.find((receta) => receta.id === id);
      await toggleRecetaDoneRequest(id, recetaFound.done === 0 ? true : false);
      setRecetas(
        recetas.map((receta) =>
        receta.id === id ? { ...receta, done: !receta.done } : receta
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RecetaContext.Provider
      value={{
        recetas,
        loadRecetas,
        deleteReceta,
        createReceta,
        getReceta,
        updateReceta,
        toggleRecetaDone,
      }}
    >
      {children}
    </RecetaContext.Provider>
  );
};
