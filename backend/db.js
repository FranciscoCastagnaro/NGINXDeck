const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "database.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("❌ Error al conectar con SQLite", err);
  else {
    console.log("✅ Base de datos conectada");
    db.run("PRAGMA foreign_keys = ON");
  }
});

module.exports = db;
