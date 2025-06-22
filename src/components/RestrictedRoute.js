import { useSelector } from "react-redux";
import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";
import { getUser } from "../redux/auth/selectors";

export const RestrictedRoute = ({component: Component, redirectTo = "/"}) => {
    const {isLoggedIn, user} = useAuth();

    const role = user.role;

    return isLoggedIn ? <Navigate to={redirectTo + "/" + role} /> : Component;
}