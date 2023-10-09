import { getData } from './http';

const MOVIE_SEARCH_TITLES = [
  'begin',
  'start',
  'end',
  'world',
  'country',
  'kingdom',
];

function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

export async function getMovies() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const titleIndex = getRandomNumber(MOVIE_SEARCH_TITLES.length);
  const movieSearchTitle = MOVIE_SEARCH_TITLES[titleIndex];

  try {
    const movies = await getData(
      `${process.env.REACT_APP_OMDB_API}?s=${movieSearchTitle}&y=${currentYear}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`,
      {},
    );
    return movies;
  } catch (error) {
    Promise.reject(error);
  }
}

export async function getMovieByTitle(movieTitle: string) {
  try {
    const movies = await getData(
      `${process.env.REACT_APP_OMDB_API}?t=${movieTitle}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`,
      {},
    );
    return movies;
  } catch (error) {
    Promise.reject(error);
  }
}
