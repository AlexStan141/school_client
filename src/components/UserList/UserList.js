import css from "./UserList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/auth/selectors";
import { removeUser } from "../../redux/auth/operations";

function UserList({ role }) {

    const users = useSelector(getUsers);
    const teachers = users.filter(user => user.role === 'teacher');
    const students = users.filter(user => user.role === 'student');
    const dispatch = useDispatch();

    return <>
        {role === 'teacher' ?
            teachers.map(user => {
                return <div key={user._id} className={css.container}>
                    <p>{user.username}</p>
                    <button onClick={() => {
                        dispatch(removeUser(user._id));
                    }}>Delete</button>
                </div>
            })
            :
            students.map(user => {
                return <div key={user._id} className={css.container}>
                    <p>{user.username}</p>
                    <button onClick={() => {
                        dispatch(removeUser(user._id));
                    }}>Delete</button>
                </div>
            })
        }
    </>

}

export default UserList;