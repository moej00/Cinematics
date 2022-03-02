import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";
import "./watch.scss";

const Watch = () => {
  const {movie}= useLocation();

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie?.video}
      />
    </div>
  );
};

export default Watch;
