import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../store";
import { PrivateRouteProps } from "../../interfaces/PrivateRouteProps";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLogged = useAuthStore((state) => state.isLogged);

  return isLogged ? children : <Navigate to="/" />;
};

export default PrivateRoute;
