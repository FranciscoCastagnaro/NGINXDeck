require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    userModel.insert(name, email, hash, (err, id) => {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id, name, email });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  userModel.getByEmail(email, async (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Credenciales inválidas' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};