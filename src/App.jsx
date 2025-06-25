import React from "react";
import Search from "./components/search";
import { useState, useEffect } from "react";
import Spinner from "./components/spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjE5ZTJkNDdjYTg2OGYwZjgyN2VhNjMwOWVlM2FjZiIsIm5iZiI6MTc1MDY4NTEyMy45NDUsInN1YiI6IjY4NTk1NWMzZGI0NjA0NGYyN2RlZGQwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W0n_NK3TOAENvXr15J95B-01aF0e32-Aa-BsW2c4WJ8';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularty.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed loading movies...");
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMsg(data.Error || 'Failed to fetch movies.');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

    } catch (e) {
      console.log(`Error fetching movies: ${e}`);
      setErrorMsg('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <h1 className="text-2xl text-amber-300 font-semibold text-center">Find <span className="font-bold bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">Movies</span> You'll Enjoy Without Hassle!</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies text-3xl text-gray-800 font-bold">
          <h2 className="mt-[40px]">All Movies</h2>
          {isLoading ? (
            <div className="w-fit mx-auto my-4 bg-blue-700 p-2 rounded-lg flex flex-row justify-center gap-1 items-center">
              <Spinner />
              <p className="text-xl font-semibold text-blue-100">Loading Movies...</p>
            </div>
          ) : errorMsg ? (
            <p className="text-xl text-black font-semibold text-center">{errorMsg}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 m-2 col-span-1 gap-2">
                  <MovieCard key={movie.id} movie={movie} />
                </div>
              ))}
            </ul>
          )}
        </section>

      </div>

    </main>
  )
}

export default App