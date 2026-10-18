require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend'))); // serves the web page too
const FIELDS = ['title', 'ingredients', 'instructions', 'cook_time_minutes', 'difficulty', 'servings'];
// GET all
app.get('/api/recipes', (req, res) => {
 res.json(db.prepare('SELECT * FROM recipes ORDER BY id').all());
});
// GET one
app.get('/api/recipes/:id', (req, res) => {
 const row = db.prepare('SELECT * FROM recipes WHERE id = ?').get(req.params.id);
 if (!row) return res.status(404).json({ error: 'Recipe not found' });
 res.json(row);
});
// POST create
app.post('/api/recipes', (req, res) => {
 const b = req.body;
 if (!b.title || !b.title.trim()) return res.status(400).json({ error: 'title is required' });
 const info = db
 .prepare(
 `INSERT INTO recipes (${FIELDS.join(',')}) VALUES (${FIELDS.map(() => '?').join(',')})`
 )
 .run(...FIELDS.map((f) => b[f] ?? null));
 res.status(201).json(db.prepare('SELECT * FROM recipes WHERE id = ?').get(info.lastInsertRowid));
});
// PUT update
app.put('/api/recipes/:id', (req, res) => {
 const existing = db.prepare('SELECT * FROM recipes WHERE id = ?').get(req.params.id);
 if (!existing) return res.status(404).json({ error: 'Recipe not found' });
 const b = { ...existing, ...req.body };
 if (!b.title || !String(b.title).trim()) return res.status(400).json({ error: 'title is required' });
 db.prepare(
 `UPDATE recipes SET ${FIELDS.map((f) => f + ' = ?').join(', ')},
 updated_at = CURRENT_TIMESTAMP WHERE id = ?`
 ).run(...FIELDS.map((f) => b[f]), req.params.id);
 res.json(db.prepare('SELECT * FROM recipes WHERE id = ?').get(req.params.id));
});
// DELETE
app.delete('/api/recipes/:id', (req, res) => {
 const info = db.prepare('DELETE FROM recipes WHERE id = ?').run(req.params.id);
 if (info.changes === 0) return res.status(404).json({ error: 'Recipe not found' });
 res.json({ message: 'Recipe deleted', id: Number(req.params.id) });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));