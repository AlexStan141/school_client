import css from "./TestList.module.css";
import { useEffect } from "react";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTests } from "../../redux/test/selectors";
import { selectValue } from "../../redux/testFilter/selectors";
import { deleteTest, fetchTeacherTests, fetchTests, removeTest } from "../../redux/test/operations";


function TestList() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const tests = useSelector(selectAllTests);
    const filter = useSelector(selectValue);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.role === "teacher") {
            dispatch(fetchTeacherTests(user._id));
        } else {
            dispatch(fetchTests());
        }
    }, [dispatch])


    const filteredTests = tests.filter(test => test.title.startsWith(filter));

    return <>
        {filteredTests.map(test => {
            return <div key={test._id} className={css.container}>
                <p>{test.title}</p>
                <div className={css.actions}>
                    <button onClick={() => {
                        //Do nothing
                    }}>Start</button>
                    <button onClick={() => {
                        navigate(`/index/edit_test/${test._id}`);
                    }}>Edit</button>
                    <button onClick={() => {
                        dispatch(deleteTest(test._id));
                    }}>Delete</button>
                </div>
            </div>
        })}
    </>
}

export default TestList;