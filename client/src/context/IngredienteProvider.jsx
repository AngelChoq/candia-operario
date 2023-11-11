import { createContext, useContext, useState } from "react";
import {
  getIngredientesRequest,
  deleteIngredienteRequest,
  createIngredienteRequest,
  getIngredienteRequest,
  getIngredientesRecetaRequest,
  updateIngredienteRequest,
  toggleIngredienteDoneRequest,
} from "../api/ingredientes.api";
import { IngredienteContext } from "./IngredienteContext";

//API INSUMOS
export const useIngredientes = () => {
  const context = useContext(IngredienteContext);
  if (context === undefined) {
    throw new Error("useIngredientes must be used within a IngredienteContextProvider");
  }
  return context;
};

export const IngredienteContextProvider = ({ children }) => {
  const [ingredientes, setIngredientes] = useState([]);

  async function loadIngredientes() {
    const response = await getIngredientesRequest();
    setIngredientes(response.data);
  }

  const deleteIngrediente = async (id) => {
    try {
      const response = await deleteIngredienteRequest(id);
      setIngredientes(ingredientes.filter((ingrediente) => ingrediente.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const createIngrediente = async (ingrediente) => {
    try {
      await createIngredienteRequest(ingrediente);
      // setIngredientes([...ingredientes, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getIngrediente = async (id) => {
    try {
      const response = await getIngredienteRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getIngredientesReceta = async (receta_id) => {
    try {
      const response = await getIngredientesRecetaRequest(receta_id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateIngrediente = async (id, newFields) => {
    try {
      const response = await updateIngredienteRequest(id, newFields);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleIngredienteDone = async (id) => {
    try {
      const ingredienteFound = ingredientes.find((ingrediente) => ingrediente.id === id);
      await toggleIngredienteDoneRequest(id, ingredienteFound.done === 0 ? true : false);
      setIngredientes(
        ingredientes.map((ingrediente) =>
          ingrediente.id === id ? { ...ingrediente, done: !ingrediente.done } : ingrediente
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IngredienteContext.Provider
      value={{
        ingredientes,
        loadIngredientes,
        deleteIngrediente,
        createIngrediente,
        getIngrediente,
        getIngredientesReceta,
        updateIngrediente,
        toggleIngredienteDone,
      }}
    >
      {children}
    </IngredienteContext.Provider>
  );
};
