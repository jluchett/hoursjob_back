const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool} = require('../config/db.js'); // Conexión a PostgreSQL
const { JWT } = require('../../config.js');

const router = express.Router();

/**
 * @route POST /api/auth/login
 * @description Autentica un usuario y devuelve un JWT
 * @access Public
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Validación de campos
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    // 2. Buscar usuario en la base de datos
    const query = 'SELECT id, password FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    const user = rows[0];

    // 3. Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 4. Comparar contraseña hasheada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // 5. Generar JWT (sin datos sensibles)
    const token = jwt.sign(
      { 
        userId: user.id,
        role: 'user' // Puedes agregar roles dinámicos desde la DB
      }, 
      JWT.secret, 
      { expiresIn: '8h' } // Tiempo de vida ajustable
    );

    // 6. Responder con token y datos básicos del usuario
    res.json({ 
      token,
      user: {
        id: user.id,
        email: email
      }
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;