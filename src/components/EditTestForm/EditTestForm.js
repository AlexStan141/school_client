import css from "./EditTestForm.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectDisplayedTest } from "../../redux/test/selectors";
import { editTest, getTest } from "../../redux/test/operations";

const labelFromId = (id) => {
    const questionNr = id.replace("question", "")
    return "Question " + questionNr;
}

const idsArray = (nrQuestions) => {
    let ids = [];
    for (let i = 1; i <= nrQuestions; i++) {
        ids.push(`question${i}`);
    }
    return ids;
}

function EditTestForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { testId } = useParams();
    const displayedTest = useSelector(selectDisplayedTest);
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [nrQuestions, setNrQuestions] = useState(0);

    useEffect(() => {
        setTitle(displayedTest.title ? displayedTest.title : "");
        setQuestions(displayedTest.questions ? displayedTest.questions : []);
        setNrQuestions(displayedTest.questions ? displayedTest.questions.length : 0);
    }, [displayedTest])

    const addQuestion = () => {
        setNrQuestions(nrQuestions + 1);
        setQuestions([...questions, ""]);
    }

    const editQuestion = (evt) => {
        const { name, value } = evt.target;
        const questionNrAsString = name.replace('question', '');
        const questionNr = parseInt(questionNrAsString) - 1;
        setQuestions(questions.map((currentQuestion, idx) => {
            if (idx == questionNr) {
                return value;
            } else {
                return currentQuestion;
            }
        }))
    }

    const submitTest = (e) => {
        e.preventDefault();
        dispatch(editTest({ testId, title, questions }));
        navigate("/index/tests");
    }

    const deleteQuestion = (deletedQuestion) => {
        setQuestions(questions.filter(currentQuestion => currentQuestion !== deletedQuestion))
        setNrQuestions(nrQuestions - 1)
    }

    useEffect(() => {
        dispatch(getTest(testId))
    }, [dispatch])

    return <form className={css.form} onSubmit={submitTest}>

        <div className={css.fieldContainer}>
            <label for="title">Title</label>
            <input id="title" type="text" name="title" value={title} onChange={e => { setTitle(e.target.value) }}></input>
        </div>

        {idsArray(nrQuestions).map((id, idx) => <div className={css.fieldContainer}>
            <label for={id}>{labelFromId(id)}</label>
            <div className={css.field}>
                <textarea id={id} name={id} value={questions[idx]} onChange={editQuestion} rows={3}></textarea>
                <button type="button" onClick={() => { deleteQuestion(questions[idx]) }} className={css.button + " " + css.danger}>Delete question</button>
            </div>
        </div>)}

        <div className={css.actions}>
            <button type="button" onClick={addQuestion} className={css.button + " " + css.success}>Add a question</button>
            <button type="submit" className={css.button + " " + css.success}>Save</button>
            <button type="button" onClick={() => {navigate("/index/tests");}}>Discard</button>
        </div>

    </form>

}

export default EditTestForm;