const apikeyModel = require('../models/apikeyModel');

exports.getAll = (req, res) => {
  const userId = req.user.id;
  apikeyModel.getByUser(userId, (err, keys) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(keys);
  });
};

exports.create = (req, res) => {
  const { key, value } = req.body;
  const userId = req.user.id;
  apikeyModel.insert(key, value, userId, (err, id) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id, key, value, userId });
  });
};