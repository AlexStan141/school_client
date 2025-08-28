import { styled } from "@mui/material/styles";
import css from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { pageChange } from "../../redux/auth/operations";
import { getCurrentUser } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/operations";

const StyledLink = styled(NavLink)`
    color: white;
    text-decoration: none;
    font-weight: 700;
    padding: 10px 5px;
    position: relative;

    &.active{
        color: yellow;
    }
`

function Header() {

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);

    const handlePageChange = () => {

        dispatch(pageChange())
        //Daca apare o eroare la register si ne mutam pe login eroarea trebuie sa dispara si invers
    }

    return <div className={css.header}>
        <span>
            {currentUser.username ? <span className={css.welcome}>Welcome, {currentUser.username}!</span>
                : <span className={css.welcome}>Not connected!</span>}
            <span className={css.links}>
                {!currentUser.username && <StyledLink to="/school_client" onClick={handlePageChange} end>Register</StyledLink>}
                {!currentUser.username && <StyledLink to="/school_client/login" onClick={handlePageChange} >Login</StyledLink>}
                {currentUser.role === 'admin' && <StyledLink to="/school_client/index/users">Users</StyledLink>}
                {currentUser.username && <StyledLink to="/school_client/index/tests">Tests</StyledLink>}
                {currentUser.role === 'teacher' && <StyledLink to="/school_client/index/add_test">Add test</StyledLink>}
            </span>
        </span>
        {currentUser.username && <button className={css.logout} onClick={() => {
            dispatch(logout());
        }}>Logout</button>}
    </div>

}

export default Header;