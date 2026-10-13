import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./RegistrationPage.module.css"
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { register, processChange } from "../../redux/auth/operations";
import Radio from "@mui/material/Radio";
import { getUsersError } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";


function RegistrationPage() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const error = useSelector(getUsersError);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(processChange());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await dispatch(register({ username, email, password, role })).unwrap();
            navigate("/index/users");
        } catch(e){
            console.log(e);
        }
    }

    return (<div>
        {error && <p className={css.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={css.form}>
            <div className={css.formElement}>
                <FormLabel id="username" className={css.label}>Username</FormLabel>
                <TextField aria-labelledby="username" variant="standard" name="username" type="text"
                    value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </div>
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
            <div>
                <FormLabel id="role" className={css.label}>Role</FormLabel>
                <RadioGroup aria-labelledby="role" defaultValue="student" name="role">
                    <FormControlLabel value="student" control={<Radio />} label="Student" onChange={(e) => { setRole(e.target.value) }}></FormControlLabel>
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" onChange={(e) => { setRole(e.target.value) }}></FormControlLabel>
                </RadioGroup>
            </div>
            <Button variant="contained" type="submit" className={css.button}>Submit</Button>
        </form>
    </div>)

}

export default RegistrationPage