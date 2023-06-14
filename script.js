//https://developer.themoviedb.org/reference/account-details


const tmdbKey = "c5a845f10a1aac8a9dcfa8060b642c69";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      //console.log( genres);
      return genres;
    }
  } catch (er) {
    console.log(er);
  }
};



const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const getpage=getSelectedGenrePage();
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${getpage}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  //console.log(getpage);
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      //console.log(jsonResponse.total_pages);
      const movies = jsonResponse.results;
      //console.log(movies);
      return movies;
    }
  } catch (er) {
    console.log(er);
  }
};
getMovies();
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    }
  } catch (er) {
     console.log(er);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
//   console.log(info);
  displayMovie(info);
};
//showRandomMovie();
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;

