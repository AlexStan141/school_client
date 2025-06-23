import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/auth/selectors";
import { fetchUsers } from "../../redux/auth/operations";
import { fetchTests } from "../../redux/test/operations";
import { useEffect } from "react";
import css from "../../static/styles/General.module.css";
import { selectAllTests } from "../../redux/test/selectors";
import { removeUser } from "../../redux/auth/operations";
import { removeTest } from "../../redux/test/operations";

function Admin() {

    const users = useSelector(getUsers)
    const tests = useSelector(selectAllTests)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchTests());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [users])

    useEffect(() => {
        dispatch(fetchTests());
    }, [tests])

    return <>
        <h2>Users</h2>
        {users.length == 0 ? <p>No users available</p> :
            users.map(currentUser =>
                <>
                    {currentUser.role == "admin" ? <></> :
                        <div key={currentUser._id} className={css.user}>
                            <div>
                                <p><b>{currentUser.username}({currentUser.role})</b></p>
                                <p>{currentUser.email}</p>
                            </div>
                            <div>
                                <button className={css.button + " " + css.danger} onClick={() => {
                                    dispatch(removeUser(currentUser._id));
                                }}>Delete</button>
                            </div>
                        </div>
                    }
                </>
            )
        }
        <h2>Tests</h2>
        {tests.length == 0 ? <p>No tests available</p> :
            tests.map(currentTest => <div key={currentTest._id} className={css.test}>
                <div>
                    <p><b>{currentTest.title}({currentTest.questions.length} questions)</b></p>
                    <p>{currentTest.owner}</p>
                </div>
                <div>
                    <button className={css.button + " " + css.danger} onClick={() => {
                        dispatch(removeTest(currentTest._id));
                    }}>Delete</button>
                </div>
            </div>)
        }
    </>

}

export default Admin;