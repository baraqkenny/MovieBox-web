import { useState, useEffect } from 'react';
import './MovieDetails.css';
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

// import logo from "...movie-details/assets/tv.png"

function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMovieTrailers, setShowMovieTrailers] = useState([])
  const { id } = useParams();


    const opts = {
      height: "449",
      width: "1125",
    };


useEffect(() => {
  async function fetchMovieDetails() {
    try {
      const API_KEY = "38fd0af9a364e45ff656fb0cb0a08c80";
      // Fetch movie details by ID
      const response = await fetch(
        `http://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`,
        //https://api.themoviedb.org/3/movie/${id}
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGZkMGFmOWEzNjRlNDVmZjY1NmZiMGNiMGEwOGM4MCIsInN1YiI6IjYzMjg4MDgxMGMxMjU1MDA3ZDI5ODE1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JqwWU2ubIxC4jf-HE3r_zC5KQcUzVlFDe17Et6rXmfg",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }

      const data = await response.json();
      console.log( data )
      setShowMovieTrailers(data.videos.results.slice(0, 1))
     console.log(data.videos.results)
      setMovieDetails(data);
  
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  fetchMovieDetails();
}, [id]);
  


  return (
    <div className="movie-details-container">
      <div className="side-nav-container">
        <div className="side-nav-logo">
          <img src="../tv.png" alt="website-logo" />
          <h2>MovieBox</h2>
        </div>

        <div className="side-nav-list">
          <ul>
            <div className="side-nav-home">
              <span>
                <i className="bx bx-home-alt"></i>
              </span>
              <li>Home</li>
            </div>
            <div className="side-nav-movies">
              <span>
                <i className="bx bx-video"></i>
              </span>
              <li className="active">Movies</li>
            </div>
            <div className="side-nav-tv">
              <span>
                <i className="bx bx-tv"></i>
              </span>
              <li>TV Series</li>
            </div>
            <div className="side-nav-upcoming">
              <span>
                <i className="bx bx-video"></i>
              </span>
                <li>Upcoming</li>
            </div>
          </ul>

          <div className="play-movies-wrapper">
            <div className="play-movies-content">
              <h4>
                Play movie quizes
                <br /> and earn
                <br /> free tickets
              </h4>
              <p>
                50k people are playing
                <br /> now
              </p>
              <button>start playing</button>
            </div>
          </div>
          <div className="log-out-wrapper">
            <box-icon name="log-in"></box-icon>
            <h4 className="log-out">Log out</h4>
          </div>
        </div>
      </div>

      <div className="movie-details-wrapper">
        {loading ? (
          <div className="loader"></div>
        ) : (
          showMovieTrailers.map((movieTrailer) => (
            <div key={movieTrailer.id}>
              <YouTube videoId={movieTrailer.key} opts={opts} />
              <div className="movie-details-content">
                <div className="movie-overview">
                  <h4>
                    {movieDetails.title} <span>.</span>{" "}
                    {movieDetails.release_date} <span>.</span> PG-13
                  </h4>

                  <p>{movieDetails.overview}</p>

                  <div className="movie-crew">
                    <p>
                      Director: <span>Joseph kosinski</span>
                    </p>
                    <p>
                      Writers: <span>Jim Cash, Jack Epps jr, Peter Craig</span>
                    </p>
                    <p>
                      Stars:
                      <span>Tom Cruise, Jennifer Connelly, Miles Teller</span>
                    </p>

                    <div className="movie-detail-footer">
                      <h4 className="top-rated">Top rated movie #65</h4>
                      <h4 style={{ color: '#333333'}}>Awards 9 nominations</h4>
                      <box-icon name="chevron-down"></box-icon>
                    </div>
                  </div>
                </div>
                <div className="movie-details-content-two">
                  <h4>
                    <span className="popular">
                      <box-icon name="star"></box-icon>
                    </span>
                    8.6 | 350k
                  </h4>
                  <p className="show-times">
                    <span>
                      <img src="../Two Tickets.png" alt="" />
                    </span>
                    See Showtimes
                  </p>
                  <p className="watch-options">
                    <span>
                      <box-icon name="list-ul"></box-icon>
                    </span>
                    More watch options
                  </p>
                  <img className="image" src="../Rectangle 37.png" alt="" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MovieDetails
