const { pool } = require("../config/db");

const Employee = {
  // Crear empleado
  create: async (name, hourlyRate) => {
    if (!name || !hourlyRate) throw new Error("Faltan campos obligatorios");
    const query = `
      INSERT INTO employees (name, hourly_rate) 
      VALUES ($1, $2) 
      RETURNING *`;
    const values = [name, parseFloat(hourlyRate)];
    try {
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (err) {
      throw new Error(`Error al crear empleado: ${err.message}`);
    }
  },

  // Obtener todos los empleados
  getAll: async () => {
    const query = "SELECT * FROM employees";
    const { rows } = await pool.query(query);
    return rows;
  },

  // Obtener empleado por ID
  getById: async (id) => {
    const query = "SELECT * FROM employees WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  },

  // Actualizar empleado
  update: async (id, updates) => {
    const { name, hourly_rate } = updates;
    const query = `
      UPDATE employees 
      SET name = $1, hourly_rate = $2 
      WHERE id = $3 
      RETURNING *`;
    const values = [name, hourly_rate, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Eliminar empleado
  delete: async (id) => {
    const query = "DELETE FROM employees WHERE id = $1 RETURNING *";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },
};

module.exports = Employee;