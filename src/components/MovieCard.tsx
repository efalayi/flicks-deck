export interface IMovieCardProps {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

function MovieCard(props: IMovieCardProps) {
  return (
    <div>
      <span>{props.Title}</span>
    </div>
  );
}

export default MovieCard;
