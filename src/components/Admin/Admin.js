import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../redux/auth/selectors";
import { fetchUsers } from "../../redux/auth/operations";
import { fetchTests } from "../../redux/test/operations";
import { useEffect } from "react";
import css from "../../static/styles/General.module.css";
import { selectAllTests } from "../../redux/test/selectors";

function Admin() {

    const users = useSelector(getUsers)
    const tests = useSelector(selectAllTests)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchTests());
    }, [dispatch]);

    return <>
        <h2>Users</h2>
        {users.map(currentUser =>
            <>
                {currentUser.role == "admin" ? <></> :
                    <div key={currentUser._id} className={css.user}>
                        <div>
                            <p><b>{currentUser.username}({currentUser.role})</b></p>
                            <p>{currentUser.email}</p>
                        </div>
                        <div>
                            <button className={css.button + " " + css.danger}>Delete</button>
                        </div>
                    </div>
                }
            </>
        )}
        <h2>Tests</h2>
        {tests.map(currentTest => <div key={currentTest.id} className={css.test}>
            <div>
                <p><b>{currentTest.title}({currentTest.questions.length} questions)</b></p>
                <p>{currentTest.owner}</p>
            </div>
            <div>
                <button className={css.button + " " + css.danger}>Delete</button>
            </div>
        </div>)}
    </>

}

export default Admin;