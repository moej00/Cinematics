import "./app.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import Search from "./pages/search/Search";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate replace to="/register" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate replace to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate replace to="/" />}
        />
        <Route path ="/search" element = {<Search/>}/>

        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch" element={<Watch />} />
            
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
