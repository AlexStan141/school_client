import { useDispatch, useSelector } from "react-redux";
import css from "./TestsPage.module.css";
import { selectAllTests } from "../../redux/test/selectors";
import { useEffect } from "react";
import { fetchTests, deleteTest } from "../../redux/test/operations";
import { getCurrentUser } from "../../redux/auth/selectors";
import { getUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

function TestsPage(){

    let tests = useSelector(selectAllTests);
    const navigate = useNavigate();
    const user = useSelector(getCurrentUser);
    const role = user.role;
    const username = user.username;
    if(role === 'teacher'){
        tests = tests.filter(test => test.owner == username);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTests())
    }, [tests]);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return <div>
        <h3>Your tests</h3>
        {tests.map(test => {
            return <div className={css.container} key={test._id}>
                <h3>{test.title}</h3>
                <div>
                    {role === 'student' && <button>Start</button>}
                    {role === 'teacher' && <button onClick={() => {
                        navigate(`/school_client/index/edit_test/${test._id}`);
                    }}>Edit</button>}
                    {role === 'teacher' && <button onClick={() => {
                        dispatch(deleteTest(test._id));
                    }}>Delete</button>}
                </div>
            </div>
        })}
    </div>
}

export default TestsPage;