const db = require('../db');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

exports.insert = (name, email, password, cb) => {
  db.run('INSERT INTO users(name, email, password) VALUES (?, ?, ?)', [name, email, password], function (err) {
    cb(err, this?.lastID);
  });
};

exports.getByEmail = (email, cb) => {
  db.get('SELECT * FROM users WHERE email = ?', [email], cb);
};