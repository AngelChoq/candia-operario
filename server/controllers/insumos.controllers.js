import { pool } from "../db.js";

export const getInsumos = async (req, res) => {
  // res.send('obteniendo insumos');
  try {
    const [result] = await pool.query(
      "SELECT * FROM insumos ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getInsumo = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM insumos WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length === 0)
      return res.status(404).json({ message: "Insumo not found" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createInsumo = async (req, res) => {
  // res.send('creando insumos');
  // res.send(req.body);
  try {
    const { nombre, peso } = req.body;
    const [result] = await pool.query(
      "INSERT INTO insumos(nombre, peso) VALUES (?, ?)",
      [nombre, peso]
    );
    res.json({
      id: result.insertId,
      nombre:nombre,
      peso:peso,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateInsumo = async (req, res) => {
  try {
    const result = await pool.query("UPDATE insumos SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteInsumo = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM insumos WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Insumo not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};