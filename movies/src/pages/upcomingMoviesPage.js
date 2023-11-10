import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingmovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const UpcomingMovies = (props) => {
  const [upcomingMovies, setMovies] = useState([]);
  const favorites = upcomingMovies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const addToFavorites = (movieId) => {
    const updatedMovies = upcomingMovies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingmovies().then(movies => {
      setMovies(movies);
    });
  }, []);
console.log(upcomingMovies);
  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={upcomingMovies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} addToFavorites={addToFavorites} />
      }}
      selectFavorite={addToFavorites}
    />
    
  );
};
export default UpcomingMovies;