import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/auth/selectors";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/auth/operations";
import { logout } from "../../redux/auth/operations";
import { Outlet, useNavigate } from "react-router-dom";
import css from "../../static/styles/General.module.css"

function MainPage() {

    const user = useSelector(getCurrentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    useEffect(() => {
        if(!user.username){
            navigate("/login")
        }
    }, [user])

    return <div>
        <div className={css.banner}>
            <h1 className={css.intro}>Welcome, {user.username}!</h1>
            <button className={css.button + " " + css.white} onClick={() => {
                dispatch(logout());
            }}>Logout</button>
        </div>
        <div className={css.content}>
            <Outlet />
        </div>
    </div>
}

export default MainPage;