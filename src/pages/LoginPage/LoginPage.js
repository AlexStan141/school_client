import Header from "../../components/Header/Header";
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import css from "./LoginPage.module.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { getUsersError } from '../../redux/auth/selectors';
import Button from '@mui/material/Button';

function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const error = useSelector(getUsersError)
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        dispatch(login({ email, password }))
        form.reset()
    }

    return (<div>
        <Header></Header>
        {error && <p className={css.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={css.form}>
            <div className={css.formElement}>
                <FormLabel id="email" className={css.label}>Email</FormLabel>
                <TextField aria-labelledby="email" variant="standard" name="email" type="email"
                    value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div className={css.formElement}>
                <FormLabel id="password" className={css.label}>Password</FormLabel>
                <TextField aria-labelledby="password" variant="standard" name="password" type="password"
                    value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <Button variant="contained" type="submit" className={css.button}>Submit</Button>
        </form>
    </div>)

}

export default LoginPage;