import { useSelector } from "react-redux";
import EditTestForm from "../../components/EditTestForm/EditTestForm";
import { selectTestError } from "../../redux/test/selectors";
import { useNavigate } from "react-router-dom";
import css from "./EditTestPage.module.css";

function EditTestPage(){

    const error = useSelector(selectTestError);
    const navigate = useNavigate();

    const submit = () => {
        if(!error){
            navigate("/index/tests");
        }
    }

    return <>
        {error && <p className={css.error}>{error}</p>}
        <h3>Edit test</h3>
        <EditTestForm onSubmit={submit}></EditTestForm>
    </>

}

export default EditTestPage;