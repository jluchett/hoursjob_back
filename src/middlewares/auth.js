const jwt = require('jsonwebtoken');
const { JWT } = require('../../config.js');
const { pool } = require('../config/db.js');

/**
 * Middleware de autenticación JWT mejorado (CommonJS)
 */
const authenticate = async (req, res, next) => {
  // 1. Extraer token del header 'Authorization'
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  // 2. Validar presencia del token
  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Token no proporcionado' 
    });
  }

  try {
    // 3. Verificar token
    const decoded = jwt.verify(token, JWT.secret);

    // 4. Verificar usuario en base de datos (opcional pero recomendado)
    const userCheck = await pool.query(
      'SELECT id, is_active FROM users WHERE id = $1', 
      [decoded.userId]
    );

    if (!userCheck.rows[0] || !userCheck.rows[0].is_active) {
      return res.status(401).json({
        success: false,
        error: 'Usuario no autorizado'
      });
    }

    // 5. Adjuntar datos al request
    req.user = {
      id: decoded.userId,
      role: decoded.role || 'user'
    };

    next();
  } catch (err) {
    // 6. Manejo específico de errores
    let statusCode = 400;
    let errorMessage = 'Token inválido';

    if (err.name === 'TokenExpiredError') {
      statusCode = 401;
      errorMessage = 'Token expirado';
    } else if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Token malformado';
    }

    // 7. Registrar error (sin exponer detalles en producción)
    console.error(`Error JWT: ${err.message}`);
    res.status(statusCode).json({
      success: false,
      error: errorMessage
    });
  }
};

/**
 * Middleware de autorización por roles (CommonJS)
 */
const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        error: 'Acceso prohibido'
      });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};