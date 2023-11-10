import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  // We will use this function in a later section
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
      ) )
    };
    
    const [myReviews, setMyReviews] = useState( {} ) 
    
    const addReview = (movie, review) => {
      setMyReviews( {...myReviews, [movie.id]: review } )
    };
    console.log(myReviews);
    
    const [mustWatch, setMustwatch] = useState ( [] )

    const addToMustWatch = (movie) => {
      let newMustWatch = [];
      if(!mustWatch.includes(movie.id)){
        newMustWatch = [...mustWatch, movie.id];
      }
      else{
        newMustWatch = [...mustWatch];
      }
      setMustwatch(newMustWatch);
    }
    console.log(mustWatch);


  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};



export default MoviesContextProvider;