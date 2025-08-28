import { useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/auth/selectors";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../redux/auth/operations";
import { Outlet, useNavigate } from "react-router-dom";
import css from "./MainPage.module.css"
import Header from "../../components/Header/Header";

function MainPage() {

    const user = useSelector(getCurrentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    useEffect(() => {
        if(!user.username){
            navigate("/school_client/login")
        }
    }, [user])

    return <div>
        <Header></Header>
        <div className={css.content}>
            <Outlet />
        </div>
    </div>
}

export default MainPage;