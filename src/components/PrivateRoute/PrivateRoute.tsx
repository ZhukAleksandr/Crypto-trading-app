import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store";

interface PrivateRouteProps {
  element: React.ReactElement;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const isLogged = useAuthStore((state) => state.isLogged);

  return isLogged ? element : <Navigate to="/" />;
};

export default PrivateRoute;
