import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTest } from "../../redux/test/operations";
import { selectDisplayedTest } from "../../redux/test/selectors";

function ViewTest() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const displayedTest = useSelector(selectDisplayedTest);
    const {testId} = useParams();

    useEffect(() => {
        dispatch(getTest(testId));
    }, [dispatch])

    return <>
        <IoIosArrowDropleftCircle style={{ "width": "30px", "height": "30px" }} onClick={() => {
            navigate("/school_client/index/teacher")
        }} />
        <h3>View test</h3>
        <p><b>Title: {displayedTest.title}</b></p>
    </>
}

export default ViewTest;