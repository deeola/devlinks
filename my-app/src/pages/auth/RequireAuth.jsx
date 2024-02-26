import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();


    console.log(`auth: ${JSON.stringify(auth)}`)

    return (
             auth?.accessToken ? <Outlet /> : <Navigate to="/" />
    );
}

export default RequireAuth;