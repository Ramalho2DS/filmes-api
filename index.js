const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

let movies = [
  { id: 1, title: "O Poderoso Chefão", director: "Francis Ford Coppola", year: 1972, genre: "Crime" },
  { id: 2, title: "Forrest Gump", director: "Robert Zemeckis", year: 1994, genre: "Drama" },
  { id: 3, title: "A Origem", director: "Christopher Nolan", year: 2010, genre: "Sci-Fi" },
  { id: 4, title: "Clube da Luta", director: "David Fincher", year: 1999, genre: "Drama" },
  { id: 5, title: "Interestelar", director: "Christopher Nolan", year: 2014, genre: "Sci-Fi" },
  { id: 6, title: "Gladiador", director: "Ridley Scott", year: 2000, genre: "Ação" },
  { id: 7, title: "O Senhor dos Anéis: O Retorno do Rei", director: "Peter Jackson", year: 2003, genre: "Fantasia" },
  { id: 8, title: "Matrix", director: "Lana e Lilly Wachowski", year: 1999, genre: "Ficção científica" },
  { id: 9, title: "Cidadão Kane", director: "Orson Welles", year: 1941, genre: "Drama" },
  { id: 10, title: "Os Bons Companheiros", director: "Martin Scorsese", year: 1990, genre: "Crime" },
];

let nextId = 11;

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: 'Filme não encontrado' });
  res.json(movie);
});

app.post('/movies', (req, res) => {
  const { title, director, year, genre } = req.body;
  if (!title || !director || !year || !genre) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const newMovie = {
    id: nextId++,
    title,
    director,
    year,
    genre
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.put('/movies/:id', (req, res) => {
  const { title, director, year, genre } = req.body;
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: 'Filme não encontrado' });

  if (title !== undefined) movie.title = title;
  if (director !== undefined) movie.director = director;
  if (year !== undefined) movie.year = year;
  if (genre !== undefined) movie.genre = genre;

  res.json(movie);
});

app.delete('/movies/:id', (req, res) => {
  const id = parseInt(req.params.id);
  movies = movies.filter(m => m.id !== id);
  res.json({ message: 'Filme deletado com sucesso' });
});

app.listen(port, () => {
  console.log(`🎬 API de filmes rodando em http://localhost:${port}`);
});
