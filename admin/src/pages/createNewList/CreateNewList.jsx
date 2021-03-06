import { useState } from "react";
import "./createNewList.css";
import { getMovies } from "../../context/movieContext/ApiCalls";
import { useContext } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { useEffect } from "react";
import { createList } from "../../context/listContext/ApiCalls";
import { useNavigate } from "react-router-dom";

export default function CreateNewList() {
  const [list, setList] = useState(null);
  const navigate = useNavigate();

  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const { dispatch } = useContext(ListContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const changeHandler = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const selectHandler = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    navigate("/lists");
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={changeHandler}
            />
          </div>

          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={changeHandler}
            />
          </div>

          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={changeHandler}>
              <option value="movie">Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={selectHandler}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={submitHandler}>
          Create
        </button>
      </form>
    </div>
  );
}
