import { createContext, useContext, useState } from "react";
import {
  getRecetasInsumosRequest,
  deleteRecetaInsumoRequest,
  createRecetaInsumoRequest,
  getRecetaInsumoRequest,
  getRecetaInsumoListRequest,
  updateRecetaInsumoRequest,
  toggleRecetaInsumoDoneRequest,
} from "../api/recetas-insumos.api";
import { RecetaInsumoContext } from "./RecetaInsumoContext";

export const useRecetasInsumos = () => {
  const context = useContext(RecetaInsumoContext);
  if (context === undefined) {
    throw new Error("useRecetasInsumos must be used within a RecetaInsumoContextProvider");
  }
  return context;
};

export const RecetaInsumoContextProvider = ({ children }) => {
  const [recetasInsumos, setRecetasInsumos] = useState([]);

  async function loadRecetasInsumos() {
    const response = await getRecetasInsumosRequest();
    setRecetasInsumos(response.data);
  }

  const deleteRecetaInsumo = async (id) => {
    try {
      const response = await deleteRecetaInsumoRequest(id);
      setRecetasInsumos(recetasInsumos.filter((recetaInsumo) => recetaInsumo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createRecetaInsumo = async (recetaInsumo) => {
    try {
      await createRecetaInsumoRequest(recetaInsumo);
      // setRecetasInsumos([...recetas, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getRecetaInsumo = async (id) => {
    try {
      const response = await getRecetaInsumoRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getRecetaInsumoList = async (id) => {
    try {
      const response = await getRecetaInsumoListRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateRecetaInsumo = async (id, newFields) => {
    try {
      const response = await updateRecetaInsumoRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleRecetaInsumoDone = async (id) => {
    try {
      const recetaInsumoFound = recetasInsumos.find((recetaInsumo) => recetaInsumo.id === id);
      await toggleRecetaInsumoDoneRequest(id, recetaInsumoFound.done === 0 ? true : false);
      setRecetasInsumos(
        recetasInsumos.map((recetaInsumo) =>
        recetaInsumo.id === id ? { ...recetaInsumo, done: !recetaInsumo.done } : recetaInsumo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RecetaInsumoContext.Provider
      value={{
        recetasInsumos,
        loadRecetasInsumos,
        deleteRecetaInsumo,
        createRecetaInsumo,
        getRecetaInsumo,
        getRecetaInsumoList,
        updateRecetaInsumo,
        toggleRecetaInsumoDone,
      }}
    >
      {children}
    </RecetaInsumoContext.Provider>
  );
};
