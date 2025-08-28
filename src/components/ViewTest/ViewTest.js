import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTest } from "../../redux/test/operations";
import { getUser } from "../../redux/auth/operations";
import { selectDisplayedTest } from "../../redux/test/selectors";
import { getCurrentUser } from "../../redux/auth/selectors";

function ViewTest() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getCurrentUser);
    const displayedTest = useSelector(selectDisplayedTest);
    const { testId } = useParams();

    useEffect(() => {
        dispatch(getUser());
        dispatch(getTest(testId));
    }, [dispatch])

    return <>
        <IoIosArrowDropleftCircle style={{ "width": "30px", "height": "30px" }} onClick={() => {
            navigate("/school_client/index/teacher")
        }} />
        <h3>View test</h3>
        <p><b>Title: </b>{displayedTest.title}</p>
        {user.username !== displayedTest.owner && <p><b>Owner: </b>{displayedTest.owner}</p>}
        <div>
            {displayedTest.questions && displayedTest.questions.map((question, idx) =>
                <p><b>Question {idx + 1}: </b> {question} </p>
            )}
        </div>
        
    </>
}

export default ViewTest;