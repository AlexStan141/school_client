import { useSelector } from "react-redux";
import TestFilter from "../../components/TestFilter/TestFilter";
import TestList from "../../components/TestList/TestList";
import { selectTestSuccess } from "../../redux/test/selectors";
import css from "./TestsPage.module.css";

function TestsPage(){

    const success = useSelector(selectTestSuccess);

    return <>
        <h3>Tests list</h3>
        {success && <p class={css.success}>{success}</p>}
        <TestFilter></TestFilter>
        <TestList></TestList>
    </>
    
}

export default TestsPage;