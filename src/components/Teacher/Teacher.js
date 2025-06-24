import { useSelector, useDispatch } from "react-redux";
import { selectAllTests } from "../../redux/test/selectors";
import { getCurrentUser } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchTests } from "../../redux/test/operations";
import { getUser } from "../../redux/auth/operations";
import css from "../../static/styles/General.module.css";
import { useNavigate } from "react-router-dom";
import { deleteTest } from "../../redux/test/operations";

function Teacher() {

    const tests = useSelector(selectAllTests);
    const user = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTests());
    }, [tests])

    const username = user.username;
    const teacherTestsNumber = tests.filter(test => test.owner == username).length;
    const otherTestsNumber = tests.filter(test => test.owner !== username).length;

    return <div>
        <h2>Your tests</h2>
        {
            teacherTestsNumber == 0 ? <p>You don't have tests.</p> :
                tests.map(test => test.owner == username
                    &&
                    <div key={test._id} className={css.test}>
                        <p>{test.title}({test.questions.length} questions)</p>
                        <div className={css.actions}>
                            <button className={css.button + " " + css.success} onClick={() => {
                                navigate(`/school_client/index/viewTest/${test._id}`)
                            }}>View</button>
                            <button className={css.button + " " + css.success} onClick={() => {
                                navigate(`/school_client/index/editTest/${test._id}`)
                            }}>Edit</button>
                            <button className={css.button + " " + css.danger} onClick={() => {
                                dispatch(deleteTest(test._id))
                            }}>Delete</button>
                        </div>
                    </div>
                )
        }
        <button className={css.button + " " + css.success + " " + css.addButton} onClick={() => {
            navigate("/school_client/index/addTest")
        }}>Add test</button>
        <h2>Other tests</h2>
        {
            otherTestsNumber == 0 ? <p>No other tests</p> :
                tests.map(test => test.owner !== username
                    &&
                    <div key={test._id} className={css.test}>
                        <div className={css.infoContainer}>
                            <p>{test.title}({test.questions.length} questions)</p>
                            <p><b>Owned by {test.owner}</b></p>
                        </div>
                        <div className={css.actions}>
                            <button className={css.button + " " + css.success} onClick={() => {
                                navigate(`/school_client/index/viewTest/${test._id}`)
                            }}>View</button>
                        </div>
                    </div>
                )
        }
    </div>

}

export default Teacher;