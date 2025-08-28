import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchUsers } from "../../redux/auth/operations";
import css from "./UsersPage.module.css"

function UsersPage(){

    const users = useSelector(getUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [users])

    return <div>
        {users.map(user => {
            return <div key={user._id} className={css.user}>
                <p>{user.username}({user.role})</p>
            </div>
        })}
    </div>

}

export default UsersPage