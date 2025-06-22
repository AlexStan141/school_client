import { useSelector, useDispatch } from "react-redux";
import { selectAllTests } from "../../redux/test/selectors";
import { getCurrentUser } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchTeacherTests } from "../../redux/test/operations";
import { getUser } from "../../redux/auth/operations";
import css from "../../static/styles/General.module.css";

function Teacher() {

    const tests = useSelector(selectAllTests);
    const user = useSelector(getCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    useEffect(() => {
        if(user){
            dispatch(fetchTeacherTests(user._id));
        }
    }, [user])

    const username = user.username;

    return <div>
        <h2>Your tests</h2>
        {
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
        <button className={css.button + " " + css.success + " " + css.addButton}>Add test</button>
    </div>

}

export default Teacher;