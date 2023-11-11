import { pool } from "../db.js";

export const getIngredientes = async (req, res) => {
  // res.send('obteniendo ingredientes');
  try {
    const [result] = await pool.query(
      "SELECT * FROM ingredientes ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getIngredientesReceta = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM ingredientes WHERE receta_id = ?", [
      req.params.receta_id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Ingrediente not found" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getIngrediente = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM ingredientes WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Ingrediente not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createIngrediente = async (req, res) => {
  // res.send('creando ingredientes');
  // res.send(req.body);
  try {
    const { producto_id, insumo_id, peso } = req.body;
    const [result] = await pool.query(
      "INSERT INTO ingredientes(producto_id, insumo_id, peso) VALUES (?, ?, ?)",
      [producto_id, insumo_id, peso]
    );
    res.json({
      id: result.insertId,
      producto_id:producto_id,
      insumo_id:insumo_id,
      peso:peso,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateIngrediente = async (req, res) => {
  try {
    const result = await pool.query("UPDATE ingredientes SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteIngrediente = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM ingredientes WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Ingrediente not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};