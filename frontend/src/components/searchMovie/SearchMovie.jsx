import "./searchMovie.scss"
import React from "react"

const MovieData = ({movies})=>{
    return(

         <div className="movieData">
             {movies.map((movie)=>(
        <div key={movie._id}>
         <div className="movieLists">
         <span>{movie.title}</span>

      <div>
        <img
          width="200"
          height={120}
          src={movie.img}
          />
      </div>

      <span>({movie.year})</span>
    </div>
    </div>
             ))}
    </div>

    )
}

export default MovieData