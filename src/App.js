import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from './components/EditMovieForm';
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import axios from 'axios';
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { id } = useParams();
  const { push }= useHistory();

  useEffect(()=>{
    axios.get(`http://localhost:9000/api/movies`)
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    setMovies(movies.filter(movie =>(movie.id !== id)));
    console.log(movies)
  }

  const addToFavorites = (movie) => {
    
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>

            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies}/>
            </Route>

            <Route path="/movies/:id">
              <Movie deleteMovie={deleteMovie} />
            </Route>

            <Route path="/movies">
              <MovieList {...props} movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>

          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

