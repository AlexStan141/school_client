import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchUsers } from "../../redux/auth/operations";
import UserList from "../../components/UserList/UserList";

function UsersPage(){

    const users = useSelector(getUsers);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [users])

    return <div>
        <h3>Teachers</h3>
        <UserList role="teacher"></UserList>
        <h3>Students</h3>
        <UserList role="student"></UserList>
    </div>

}

export default UsersPage