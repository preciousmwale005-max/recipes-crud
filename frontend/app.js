// If you open index.html directly, call the local server. When served by the server (or deployed), use a relative URL.
const API = location.protocol === 'file:' ? 'http://localhost:3000/api/recipes' : '/api/recipes';
const form = document.getElementById('recipeForm');
const tableBody = document.getElementById('tableBody');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const fields = ['title', 'ingredients', 'instructions', 'cook_time_minutes', 'difficulty', 'servings'];
function esc(s) {
 return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
async function loadRecipes() {
 const res = await fetch(API);
 const recipes = await res.json();
 tableBody.innerHTML = recipes.map((r) => `
 <tr>
 <td>${r.id}</td>
 <td>${esc(r.title)}</td>
 <td>${esc(r.ingredients)}</td>
 <td>${esc(r.instructions)}</td>
 <td>${esc(r.cook_time_minutes)}</td>
 <td>${esc(r.difficulty)}</td>
 <td>${esc(r.servings)}</td>
 <td>
 <button onclick="editRecipe(${r.id})">Edit</button>
 <button onclick="deleteRecipe(${r.id})">Delete</button>
 </td>
 </tr>`).join('');
}
form.addEventListener('submit', async (e) => {
 e.preventDefault();
 const id = document.getElementById('recipeId').value;
 const body = {};
 fields.forEach((f) => (body[f] = document.getElementById(f).value));
 const res = await fetch(id ? `${API}/${id}` : API, {
 method: id ? 'PUT' : 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(body),
 });
 if (!res.ok) return alert((await res.json()).error || 'Something went wrong');
 resetForm();
 loadRecipes();
});
async function editRecipe(id) {
 const r = await (await fetch(`${API}/${id}`)).json();
 document.getElementById('recipeId').value = r.id;
 fields.forEach((f) => (document.getElementById(f).value = r[f] ?? ''));
 saveBtn.textContent = 'Update Recipe';
 cancelBtn.style.display = 'inline-block';
 window.scrollTo({ top: 0, behavior: 'smooth' });
}
async function deleteRecipe(id) {
 if (!confirm('Delete this recipe?')) return;
 await fetch(`${API}/${id}`, { method: 'DELETE' });
 loadRecipes();
}
function resetForm() {
 form.reset();
 document.getElementById('recipeId').value = '';
 saveBtn.textContent = 'Add Recipe';
 cancelBtn.style.display = 'none';
}
cancelBtn.addEventListener('click', resetForm);
loadRecipes();