import "./index.css";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="loader_wrapper">
      <CircularProgress color="secondary" />
      <div className="loader_text">Loading...</div>
    </div>
  );
};

export default Loader;
