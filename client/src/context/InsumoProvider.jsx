import { createContext, useContext, useState } from "react";
import {
  getInsumosRequest,
  deleteInsumoRequest,
  createInsumoRequest,
  getInsumoRequest,
  updateInsumoRequest,
  toggleInsumoDoneRequest,
} from "../api/insumos.api";
import { InsumoContext } from "./InsumoContext";

export const useInsumos = () => {
  const context = useContext(InsumoContext);
  if (context === undefined) {
    throw new Error("useInsumos must be used within a InsumoContextProvider");
  }
  return context;
};

export const InsumoContextProvider = ({ children }) => {
  console.log("Ingresando a InsumoContextProvider");
  const [insumos, setInsumos] = useState([]);

  async function loadInsumos() {
    const response = await getInsumosRequest();
    console.log("Ejecutando loadInsumos");
    console.log(response.data);
    setInsumos(response.data);
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
      }}
    >
      {children}
    </InsumoContext.Provider>
  );
};