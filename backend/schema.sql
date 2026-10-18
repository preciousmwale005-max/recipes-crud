CREATE TABLE recipes (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT NOT NULL,
 ingredients TEXT,
 instructions TEXT,
 cook_time_minutes INTEGER,
 difficulty TEXT,
 servings INTEGER,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO recipes (title, ingredients, instructions, cook_time_minutes, difficulty, servings) VALUES
('Nshima with Chicken Stew', 'Maize meal, chicken, tomatoes, onions, oil, salt', 'Boil water, stir in maize meal until thick. Fry onions, add tomatoes and chicken, simmer 30 min.', 60, 'Medium', 4),
('Kapenta with Vegetables', 'Kapenta, onions, tomatoes, rape leaves, oil', 'Fry kapenta until crisp, cook onions and tomatoes, add rape leaves.', 30, 'Easy', 3),
('Vegetable Fried Rice', 'Rice, carrots, peas, eggs, soy sauce, oil', 'Cook rice. Stir-fry vegetables, add eggs and rice, season with soy sauce.', 25, 'Easy', 2),
('Beef Stew', 'Beef, potatoes, carrots, onions, tomatoes, spices', 'Brown beef, add onions and tomatoes, add water and simmer 90 min.', 120, 'Medium', 5),
('Pancakes', 'Flour, eggs, milk, sugar, baking powder', 'Mix ingredients into batter and fry spoonfuls in a pan until golden.', 20, 'Easy', 4),
('Groundnut Soup', 'Groundnuts, chicken, onions, tomatoes, salt', 'Boil chicken, add ground groundnuts and simmer until thick.', 50, 'Medium', 4),
('Spaghetti Bolognese', 'Spaghetti, minced beef, tomatoes, onions, garlic', 'Cook sauce with mince and tomatoes, boil spaghetti, combine.', 40, 'Easy', 4),
('Chicken Curry', 'Chicken, curry powder, onions, tomatoes, coconut milk', 'Fry onions and spices, add chicken, tomatoes and coconut milk, simmer.', 55, 'Medium', 4),
('Vitumbuwa (Fritters)', 'Flour, sugar, yeast, water, oil', 'Make batter, let it rise 30 min, deep fry spoonfuls until brown.', 45, 'Medium', 6),
('Egg Sandwich', 'Bread, eggs, butter, salt, pepper', 'Fry or scramble eggs and put between buttered bread.', 10, 'Easy', 1);
