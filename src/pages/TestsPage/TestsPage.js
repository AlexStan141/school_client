import TestFilter from "../../components/TestFilter/TestFilter";
import TestList from "../../components/TestList/TestList";

function TestsPage(){

    return <>
        <h3>Tests list</h3>
        <TestFilter></TestFilter>
        <TestList></TestList>
    </>
    
}

export default TestsPage;