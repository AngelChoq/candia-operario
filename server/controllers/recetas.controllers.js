import { pool } from "../db.js";

export const getRecetas = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM recetas WHERE deleted_at IS NULL ORDER BY created_at ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getReceta = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM recetas WHERE id = ? AND deleted_at IS NULL", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Receta not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createReceta = async (req, res) => {
  try {
    const { nombre, peso } = req.body;
    const [result] = await pool.query(
      "INSERT INTO recetas(nombre, peso) VALUES (?, ?)",
      [nombre, peso]
    );
    return res.json({
      id: result.insertId,
      nombre,
      peso,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateReceta = async (req, res) => {
  try {
    const result = await pool.query("UPDATE recetas SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteReceta = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM recetas WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Receta not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};