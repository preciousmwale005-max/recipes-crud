require('dotenv').config();
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const db = new Database(path.join(__dirname, process.env.DB_FILE || 'recipes.db'));
// Create the table and sample data the first time only
const exists = db
 .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='recipes'")
 .get();
if (!exists) {
 db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));
 console.log('Database created with sample data');
}
module.exports = db;