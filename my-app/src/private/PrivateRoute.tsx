import { Navigate } from 'react-router-dom';



interface PrivateRouteProps {
  isAuthenticated: boolean ;
  children: React.ReactNode;
}

const PrivateRoute = (Props: PrivateRouteProps) => {
    const {  isAuthenticated, children } = Props;
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
