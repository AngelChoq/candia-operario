import { createContext, useContext, useState } from "react";
import {
  getInsumosRequest,
  deleteInsumoRequest,
  createInsumoRequest,
  getInsumoRequest,
  updateInsumoRequest,
  toggleInsumoDoneRequest,
} from "../api/insumos.api";
import {
  getRecetasRequest,
  deleteRecetaRequest,
  createRecetaRequest,
  getRecetaRequest,
  updateRecetaRequest,
  toggleRecetaDoneRequest,
} from "../api/recetas.api";
import { InsumoContext } from "./InsumoContext";

//API INSUMOS
export const useInsumos = () => {
  const context = useContext(InsumoContext);
  if (context === undefined) {
    throw new Error("useInsumos must be used within a InsumoContextProvider");
  }
  return context;
};

export const InsumoContextProvider = ({ children }) => {
  const [insumos, setInsumos] = useState([]);

  async function loadInsumos() {
    const response = await getInsumosRequest();
    setInsumos(response.data);
  }

  const [recetas, setRecetas] = useState([]);

  async function loadRecetas() {
    const response = await getRecetasRequest();
    setRecetas(response.data);
  }

  const deleteInsumo = async (id) => {
    try {
      const response = await deleteInsumoRequest(id);
      setInsumos(insumos.filter((insumo) => insumo.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createInsumo = async (insumo) => {
    try {
      await createInsumoRequest(insumo);
      // setInsumos([...insumos, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getInsumo = async (id) => {
    try {
      const response = await getInsumoRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateInsumo = async (id, newFields) => {
    try {
      const response = await updateInsumoRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleInsumoDone = async (id) => {
    try {
      const insumoFound = insumos.find((insumo) => insumo.id === id);
      await toggleInsumoDoneRequest(id, insumoFound.done === 0 ? true : false);
      setInsumos(
        insumos.map((insumo) =>
          insumo.id === id ? { ...insumo, done: !insumo.done } : insumo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  //API RECETAS
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
      // setInsumos([...insumos, response.data]);
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
    <InsumoContext.Provider
      value={{
        insumos,
        loadInsumos,
        deleteInsumo,
        createInsumo,
        getInsumo,
        updateInsumo,
        toggleInsumoDone,
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
    </InsumoContext.Provider>
  );
};
