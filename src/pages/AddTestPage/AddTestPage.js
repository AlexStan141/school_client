import { useDispatch, useSelector } from "react-redux";
import TestForm from "../../components/TestForm/TestForm";
import { selectTestError } from "../../redux/test/selectors";
import { getCurrentUser } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../redux/auth/operations";
import css from "./AddTestPage.module.css";

function AddTestPage() {

    const error = useSelector(selectTestError);
    const user = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = (error) => {
        if(!error){
            navigate("/index/tests");
        }
    }

    return <>
        {error && <p className={css.error}>{error}</p>}
        <h3>Add test</h3>
        <TestForm onSubmit={submit}></TestForm>
    </>

}

export default AddTestPage;