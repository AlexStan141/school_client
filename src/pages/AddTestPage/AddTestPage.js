import { useSelector } from "react-redux";
import TestForm from "../../components/TestForm/TestForm";
import { selectTestError } from "../../redux/test/selectors";
import { useNavigate } from "react-router-dom";

function AddTestPage() {

    const error = useSelector(selectTestError);
    const navigate = useNavigate();

    const submit = (error) => {
        if(!error){
            navigate("/index/tests");
        }
    }

    return <>
        {error && <p>{error}</p>}
        <h3>Add test</h3>
        <TestForm onSubmit={submit}></TestForm>
    </>

}

export default AddTestPage;