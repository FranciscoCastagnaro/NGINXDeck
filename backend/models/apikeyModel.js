const db = require('../db');

db.run(`
  CREATE TABLE IF NOT EXISTS apikeys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE
  )
`);

exports.insert = (key, value, userId, cb) => {
  db.run('INSERT INTO apikeys(key, value, userId) VALUES (?, ?, ?)', [key, value, userId], function (err) {
    cb(err, this?.lastID);
  });
};

exports.getAll = (cb) => {
  db.all('SELECT * FROM apikeys', cb);
};

exports.getByUser = (userId, cb) => {
  db.all('SELECT * FROM apikeys WHERE userId = ?', [userId], cb);
};