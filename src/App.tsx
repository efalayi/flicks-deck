import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './App.css';

import MovieCard, { IMovieCardProps } from './components/MovieCard';
import { getMovies } from './api/movies.api';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchTitle(value);
  };

  const handleMovieSearch = async (event: FormEvent) => {
    event.preventDefault();
    console.log('search: ', searchTitle);
  };

  useEffect(() => {
    async function loadInitialData() {
      const response = await getMovies();
      setMovies(response.Search);
    }

    loadInitialData();

    return function () {
      setLoading(false);
    };
  }, [loading]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Flicks Deck</h1>
      </header>
      <section>
        <form onSubmit={handleMovieSearch}>
          <input
            type="search"
            id="search"
            placeholder="Search"
            name="searchTitle"
            value={searchTitle}
            onChange={handleInputChange}
          />
          <button>Search</button>
        </form>
      </section>
      <section>
        {movies.map((movie: IMovieCardProps) => {
          return <MovieCard key={movie.imdbID} {...movie} />;
        })}
      </section>
    </div>
  );
}

export default App;
