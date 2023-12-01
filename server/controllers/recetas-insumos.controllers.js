import { pool } from "../db.js";

export const getRecetasInsumos = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM recetas_insumos WHERE deleted_at IS NULL ORDER BY created_at ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRecetaInsumo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM recetas_insumos WHERE id = ? AND deleted_at IS NULL", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "RecetaInsumo not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createRecetaInsumo = async (req, res) => {
  try {
    const { receta_id, insumo_id, peso } = req.body;
    const [result] = await pool.query(
      "INSERT INTO recetas_insumos(receta_id, insumo_id, peso) VALUES (?, ?, ?)",
      [receta_id, insumo_id, peso]
    );
    res.json({
      id: result.insertId,
      receta_id,
      insumo_id,
      peso,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateRecetaInsumo = async (req, res) => {
  try {
    const result = await pool.query("UPDATE recetas_insumos SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteRecetaInsumo = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM recetas_insumos WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "RecetaInsumo not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};