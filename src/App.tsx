import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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

  console.log('movies: ', movies);

  return (
    <div className="bg-white">
      <header className="my-8">
        <h1 className="text-3xl text-center font-bold underline">
          Flicks Deck
        </h1>
      </header>
      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <form className="w-full flex gap-x-4" onSubmit={handleMovieSearch}>
          <input
            className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="search"
            id="search"
            placeholder="Enter movie / series title..."
            name="searchTitle"
            value={searchTitle}
            onChange={handleInputChange}
          />
          <button className="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-5 text-white hover:bg-indigo-500">
            Search
          </button>
        </form>
      </section>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Movies
        </h2>

        <section className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movies.map((movie: IMovieCardProps) => {
            return <MovieCard key={movie.imdbID} {...movie} />;
          })}
        </section>
      </div>
    </div>
  );
}

export default App;
