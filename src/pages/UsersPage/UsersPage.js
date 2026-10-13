import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUsersSuccess } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchUsers } from "../../redux/auth/operations";
import UserList from "../../components/UserList/UserList";
import css from "./UsersPage.module.css";

function UsersPage(){

    const users = useSelector(getUsers);
    const dispatch = useDispatch();
    const success = useSelector(getUsersSuccess);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [users])

    return <div>
        {success && <p className={css.success}>{success}</p>}
        <h3>Teachers</h3>
        <UserList role="teacher"></UserList>
        <h3>Students</h3>
        <UserList role="student"></UserList>
    </div>

}

export default UsersPage