import { useState } from "react";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser } from "../../redux/slice/dataSlice";
import { Navigate } from "react-router-dom";
import PopUp from "../PopUp";

const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.data.isLoggedIn);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    dispatch(loginUser({ username, password }));
  };

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login_wrapper">
      <PopUp hideCloseIcon={true}>
        <div className="heading" data-cy="login_heading">
          Sign In
        </div>
        <div className="field">
          <div>Username</div>
          <div>
            <input
              data-cy="login_username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div>Password</div>
          <div>
            <input
              data-cy="login_password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <button
            disabled={!username || !password}
            onClick={handleSubmit}
            data-cy="login_submit"
          >
            Submit
          </button>
        </div>
      </PopUp>
    </div>
  );
};

export default Login;
