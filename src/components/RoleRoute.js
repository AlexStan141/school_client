import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";

export const RoleRoute = ({ component: Component, redirectTo = "/", role = "", secondRole = ""}) => {
    const { isLoggedIn, user} = useAuth();

    if(!isLoggedIn){
        return <Navigate to={redirectTo}></Navigate>
    }

    if(user.role !== role && user.role !== secondRole){
        return <Navigate to={redirectTo}></Navigate>
    }

    return Component
}