import { useSelector, useDispatch } from "react-redux";
import { selectAllTests } from "../../redux/test/selectors";
import { getCurrentUser } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchTeacherTests } from "../../redux/test/operations";
import { getUser } from "../../redux/auth/operations";
import css from "../../static/styles/General.module.css";
import { useNavigate } from "react-router-dom";

function Teacher() {

    const tests = useSelector(selectAllTests);
    const user = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    useEffect(() => {
        if (user) {
            dispatch(fetchTeacherTests(user._id));
        }
    }, [user])

    const username = user.username;
    const teacherTestsNumber = tests.filter(test => test.owner == username).length;

    return <div>
        <h2>Your tests</h2>
        {
            teacherTestsNumber == 0 ? <p>You don't have tests.</p> :
                tests.map(test => test.owner == username
                    ?
                    <div key={test._id} className={css.test}>
                        <p>{test.title}({test.questions.length} questions)</p>
                        <button className={css.button + " " + css.success}>Edit</button>
                    </div>
                    :
                    <></>
                )
        }
        <button className={css.button + " " + css.success + " " + css.addButton} onClick={() => {
            navigate("/school_client/index/addTest")
        }}>Add test</button>
    </div>

}

export default Teacher;