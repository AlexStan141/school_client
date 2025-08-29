import { useDispatch } from "react-redux"
import { setTestFilter } from "../../redux/testFilter/slice";

function TestFilter(){

    const dispatch = useDispatch();

    return <input type="text" placeholder="Filter tests" onChange={(e) => {
        dispatch(setTestFilter(e.target.value))
    }}></input>

}

export default TestFilter;