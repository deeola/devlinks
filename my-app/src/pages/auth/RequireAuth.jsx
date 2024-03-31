import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();

    return (
             auth?.accessToken ? <div data-testid="myOutlet">
                <Outlet /> 
             </div> : <Navigate to="/" />
    );
}

export default RequireAuth;
