import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTests } from "../../redux/test/operations";
import { selectAllTests } from "../../redux/test/selectors";
import css from "../../static/styles/General.module.css";

function Student(){

    const tests = useSelector(selectAllTests);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTests());
    }, [dispatch])

    return <div>
        <h2>Tests</h2>
        {tests.map(test => <div key={test._id} className={css.test}>
            <p>{test.title}({test.questions.length} questions)</p>
            <button className={css.button + " " + css.success}>Start</button>
        </div>)}
    </div>

}

export default Student;