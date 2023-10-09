export const API_URL = `${process.env.REACT_APP_OMDB_API}`;

type MovieType = 'movies' | 'series' | 'episode';
type PlotType = 'short' | 'full';
type DataType = 'json' | 'xml';

type UrlProps = {
  search: string | undefined;
  imdb: string | undefined;
  title: string | undefined;
  type: MovieType;
  year: number;
  plot: PlotType;
  dataType: DataType;
  page: number;
};

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export function createURL({
  search = '',
  imdb = '',
  title = '',
  type = 'movies',
  year = currentYear,
  plot = 'short',
  dataType = 'json',
  page = 1,
}: Partial<UrlProps>) {
  const requestParameters =
    imdb && imdb.length > 0
      ? `?i=${imdb}&type=${type}&y=${
          year | currentYear
        }&r=${dataType}&plot=${plot}`
      : title && title.length > 0
      ? `?t=${title}&type=${type}&y=${
          year | currentYear
        }&r=${dataType}&plot=${plot}`
      : // : `?s=${search}&type=${type}&y=${
        //     year | currentYear
        //   }&r=${dataType}&page=${page}`;
        `?s=${search}&type=${type}&y=${year | currentYear}`;

  return `${process.env.REACT_APP_OMDB_API}${requestParameters}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;
}

export async function http(url: string, options: object) {
  const request = new Request(url, {
    ...options,
  });

  const response = await fetch(request);
  const responseData = await response.json();

  if (response.ok) {
    return Promise.resolve(responseData);
  }

  const error = {
    status: response.status,
    message: responseData.message,
  };

  return Promise.reject(error);
}

export async function getData(url: string, options: object) {
  return http(url, {
    method: 'GET',
    ...options,
  });
}
