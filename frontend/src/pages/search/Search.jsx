import axios from "axios";
import React, { useEffect, useState} from "react";
import './search.scss';


const Search = () => {

  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setIsLoading] = useState(false)

 useEffect(() => {
   setIsLoading(true)
    const getMovies = async () => {
      try {
        const res = await axios.get("/movies/",{
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setMovies(res.data);
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, []);

   const searchHandler = (searchMovie) => {
        setSearchValue(searchMovie)
        if (searchValue!=="") {
            const filter = movies.filter((movie) => {
                return Object.values(movie).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            
            setFilteredMovies(filter)
        }
        else{
            setFilteredMovies(movies)
        }
    }



    const inputChangeHandler = (e)=>{
      searchHandler(e.target.value)
    }

  return (
    <>
   
      <form className="search">
        <input
        className="searchTxt"
        placeholder="Search by Movie Name or Genre"
        value={searchValue}
        onChange={inputChangeHandler}
        type="text"
        />
      </form>

      {loading ? (<div className="loader" />):(
        <div className="movieData">
          {searchValue.length> 1 ? (filteredMovies.map((movie) => (
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
          ))
          ):(
          movies.map((movie) => (
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
          ))

        )
}
        </div>

)}

</>
    );
}
export default Search;

