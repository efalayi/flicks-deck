export interface IMovieCardProps {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

function MovieCard(props: IMovieCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={props.Poster}
          alt={props.Title}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex">
        <span className="block">
          <h3 className="text-sm text-gray-700">
            <span>{props.Title}</span>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{props.Year}</p>
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
