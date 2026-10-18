import css from "./EditTestForm.module.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { selectTestLoaded } from "../../redux/test/selectors";
import { editTest, getTest, processChange } from "../../redux/test/operations";
import { getCurrentUser } from "../../redux/auth/selectors";

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

function EditTestForm({onSubmit}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { testId } = useParams();
    const loaded = useSelector(selectTestLoaded);
    const currentUser = useSelector(getCurrentUser, shallowEqual);

    const [test, setTest] = useState(null);

    useEffect(() => {

        async function loadData(){
            try{
                const response = await dispatch(getTest(testId));
                setTest(response.payload);
            } catch(e) {
                console.log(e);
            }
            
        }

        loadData();

    }, [])

    const addQuestion = () => {
        setTest({...test, questions: [...test.questions, ""]});
    }

    const editQuestion = (evt) => {
        const { name, value } = evt.target;
        const questionNrAsString = name.replace('question', '');
        const questionNr = parseInt(questionNrAsString) - 1;
        setTest({...test, questions: test.questions.map((q, idx) => {
            if(idx == questionNr){
                return value;
            } else {
                return q;
            }
        })});
    }

    const submitTest = async (e) => {
        e.preventDefault();
        try{
            await dispatch(processChange()).unwrap();
            await dispatch(editTest({ testId, title: test.title, questions: test.questions, nrDisplayedQuestions: test.nrDisplayedQuestions })).unwrap();
            navigate("/index/tests");
        } catch(error){
            console.log(error);
        }
    }

    const deleteQuestion = (idx) => {
        setTest({...test, questions: test.questions.filter((q, qIdx) => idx !== qIdx)});
    }

    if(!test){
        return <div>Test data is loading! Please wait!</div>
    }

    return <form className={css.form} onSubmit={submitTest}>

        <div className={css.fieldContainer}>
            <label for="title">Title</label>
            <input id="title" type="text" name="title" value={test.title} onChange={
                e => { setTest({...test, title: e.target.value}) }
            } className={css.input}></input>
        </div>

        <div className={css.fieldContainer}>
            <label for="nrDisplayedQuestions">Number of displayed questions</label>
            <input id="nrDisplayedQuestions" type="text" name="nrDisplayedQuestions" value={test.nrDisplayedQuestions} onChange={e => { 
                setTest({...test, nrDisplayedQuestions: e.target.value})
            }} className={css.input}></input>
        </div>

        {idsArray(test.questions.length).map((id, idx) => <div className={css.fieldContainer}>
            <label for={id}>{labelFromId(id)}</label>
            <div className={css.field}>
                <textarea id={id} name={id} value={test.questions[idx]} onChange={editQuestion} rows={3} className={css.textarea}></textarea>
                <button type="button" onClick={() => { deleteQuestion(idx) }} className={css.button + " " + css.danger}>Delete question</button>
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