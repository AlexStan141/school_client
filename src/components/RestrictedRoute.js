import { useSelector } from "react-redux";
import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";
import { getUser } from "../redux/auth/selectors";

export const RestrictedRoute = ({component: Component, redirectTo = "/"}) => {
    const {isLoggedIn, user} = useAuth();

    const role = user.role;

    let page;
    if(role === 'admin'){
        page = 'users';
    } else {
        page = 'tests';
    }

    return isLoggedIn ? <Navigate to={redirectTo + "/" + page} /> : Component;
}