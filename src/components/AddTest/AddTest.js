import css from "../../static/styles/General.module.css";
import { useState } from "react";
import { addTest } from "../../redux/test/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";

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

function AddTest() {

    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [nrQuestions, setNrQuestions] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addQuestion = () => {
        setNrQuestions(nrQuestions + 1);
        setQuestions([...questions, ""]);
    }

    const editQuestion = (evt) => {
        const {name, value} = evt.target;
        const questionNrAsString = name.replace('question', '');
        const questionNr = parseInt(questionNrAsString) - 1;
        setQuestions(questions.map((currentQuestion, idx) => {
            if(idx == questionNr){
                return value;
            } else {
                return currentQuestion;
            }
        }))
    }

    const deleteQuestion = (deletedQuestion) => {
        setQuestions(questions.filter(currentQuestion => currentQuestion !== deletedQuestion))
        setNrQuestions(nrQuestions - 1)
    }

    const submitTest = (e) => {
        e.preventDefault();
        dispatch(addTest({title, questions}));
        navigate("/school_client/index/teacher")
    }

    return <>

        <IoIosArrowDropleftCircle style={{"width": "30px", "height": "30px"}} onClick={() => {
            navigate("/school_client/index/teacher")
        }}/>
        <h3>Add a test</h3>
        <form className={css.form} onSubmit={submitTest}>

        <div className={css.fieldContainer}>
            <label for="title">Title</label>
            <input id="title" type="text" name="title" value={title} onChange={e => {setTitle(e.target.value)}}></input>
        </div>

        {idsArray(nrQuestions).map((id, idx) => <div className={css.fieldContainer}>
            <label for={id}>{labelFromId(id)}</label>
            <div className={css.field}>
                <textarea id={id} name={id} value={questions[idx]} onChange={editQuestion} rows={3}></textarea>
                <button type="button" onClick={() => {deleteQuestion(questions[idx])}} className={css.button + " " + css.danger}>Delete question</button>
            </div>
        </div>)}

        <div className={css.actions}>
            <button type="button" onClick={addQuestion} className={css.button + " " + css.success}>Add a question</button>
            <button type="submit" className={css.button + " " + css.success}>Submit</button>
        </div>

    </form>

    </>
}

export default AddTest;