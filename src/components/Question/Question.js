function Question(id, value) {

    const [question, setQuestion] = useState(value);

    return <div className={css.fieldContainer}>
        <label for={id}>{`Question${id + 1}`}</label>
        <div className={css.field}>
            <textarea id={id} name={id} value={value} onChange={(e) => {
                setQuestion(e.target.value);
            }} rows={3} className={css.questions}></textarea>
            <button type="button" className={css.button + " " + css.danger}>Delete question</button>
        </div>
    </div>

}

export default Question;