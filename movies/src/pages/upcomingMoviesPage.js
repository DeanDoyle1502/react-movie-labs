import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingmovies } from "../api/tmdb-api";
import { QueryClient, useQuery } from "react-query";
import Spinner from '../components/spinner';
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import { json } from "react-router-dom";

const UpcomingMovies = () => {
  const { data: upcomingMovies, isLoading, isError } = useQuery('upcomingMovies', getUpcomingmovies);

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <p>Error loading upcoming movies</p>;
  }

  
  const favorites = upcomingMovies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const addToFavorites = (movieId) => {
    const updatedMovies = upcomingMovies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };




const mustWatch = upcomingMovies.filter(m => m.mustWatch)
localStorage.setItem('mustWatch', JSON.stringify(mustWatch))

const addToMustWatch = (movieId) => {
  
  const updatedMustWatchMovies = upcomingMovies.map((m) =>
    m.id === movieId ? {...m, mustWatch: true} : m
  );
  
  setMovies(updatedMustWatchMovies);
};




  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={upcomingMovies}
      action={(movie) => {
        return <AddToMustWatchIcon movie={movie} />
      }}
      selectFavorite={addToFavorites}
      selectMustWatch={addToMustWatch}
    />
    
  );
};
export default UpcomingMovies;