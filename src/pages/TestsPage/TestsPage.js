import { useDispatch, useSelector } from "react-redux";
import TestFilter from "../../components/TestFilter/TestFilter";
import TestList from "../../components/TestList/TestList";
import css from "./TestsPage.module.css";
import { getCurrentUser, getUsersLoading } from "../../redux/auth/selectors";
import { selectTestLoaded, selectTestSuccess } from "../../redux/test/selectors";
import { useEffect } from "react";
import { fetchTeacherTests, fetchTests } from "../../redux/test/operations";

function TestsPage(){

    const dispatch = useDispatch();
    const success = useSelector(selectTestSuccess);
    const user = useSelector(getCurrentUser);

    useEffect(() => {

        if(!user.username) return;

        if (user.role === "teacher") {
            dispatch(fetchTeacherTests(user._id));
        } else {
            dispatch(fetchTests());
        }
    }, [dispatch, user])

    if(!user._id){
        return <>Loading...</>
    }

    return <>
        <h3>Tests list</h3>
        {success && <p class={css.success}>{success}</p>}
        <TestFilter></TestFilter>
        <TestList></TestList>
    </>
    
}

export default TestsPage;