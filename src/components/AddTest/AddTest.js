import { Typography, Button } from "@mui/material";
import css from "../../static/styles/General.module.css";
import { useState } from "react";
import { addTest } from "../../redux/test/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddTest() {

    const [message, setMessage] = useState("");
    const [questions, setQuestions] = useState([]);
    const [nrQuestions, setNrQuestions] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.elements.title.value;
        const questions = [];
        for(let i = 1; i <= nrQuestions; i += 1){
            const label = "question" + i;
            const question = form.elements[label].value;
            questions.push(question);
        }
        dispatch(addTest({title, questions}));
        navigate("/school_client/index/teacher")
        form.reset();
    }

    return <>
        <Typography variant="h3" gutterBottom>
            Add test
        </Typography>
        <p>{message}</p>
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formElement}>
                <label for="title" className={css.label}>Title</label>
                <input type="text" id="title" name="title"></input>
            </div>
            <>
                {questions.map(question => {
                    const id = question.toLowerCase().replace(" ", "");
                    return <div className={css.formElement}>
                        <label for={id} className={css.label}>{question}</label>
                        <input id={id} name={id} type="text"></input>
                    </div>
                })}
            </>
            <div className={css.actions}>
                <Button variant="contained" type="button" className={css.button} onClick={() => {
                    setNrQuestions(nrQuestions + 1)
                    setQuestions([...questions, `Question ${nrQuestions + 1}`])
                }}>Add question</Button>
                <Button variant="contained" type="submit" className={css.button}>Submit</Button>
            </div>
        </form>
    </>

}

export default AddTest;