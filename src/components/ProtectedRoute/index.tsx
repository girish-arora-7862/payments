import { ReactElement } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";

interface IProps {
  children?: ReactElement;
}

const PrivateRoute = ({ children = <></> }: IProps) => {
  const isLoggedIn = useAppSelector((state) => state.data.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
