import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./RegistrationPage.module.css"
import NumberField from '../../components/NumberField/NumberField'
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { register, processChange } from "../../redux/auth/operations";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getUsersError } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";
import { fetchSchools } from "../../redux/school/operations";
import { selectAllSchools } from "../../redux/school/selectors";


function RegistrationPage() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const [school, setSchool] = useState("");
    const [startYear, setStartYear] = useState(1950);
    const [endYear, setEndYear] = useState(0);
    const [classYear, setClassYear] = useState(0);
    const [subject, setSubject] = useState("");
    const error = useSelector(getUsersError);

    const schools = useSelector(selectAllSchools);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {

        const doStuff = async () => {
            try{
                const arrayOfPromises = [processChange(), fetchSchools()].map(action => 
                    dispatch(action).unwrap()
                );
                const responses = await Promise.allSettled(arrayOfPromises);

            } catch(error) {
                console.log(error);
            } 
        }

       doStuff();

    }, [dispatch])

    const handleSchoolChange = (e) => {
        const value = e.target.value;
        setSchool(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await dispatch(register({ username, email, password, role, school, startYear})).unwrap();
            navigate("/index/users");
        } catch(e){
            console.log(e);
        }
    }

    return (<div>
        <h1>Register</h1>
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
            <div className={css.formElement}>
                <FormLabel id="role" className={css.label}>Role</FormLabel>
                <RadioGroup aria-labelledby="role" defaultValue="student" name="role">
                    <FormControlLabel value="student" control={<Radio />} label="Student" onChange={(e) => { setRole(e.target.value) }}></FormControlLabel>
                    <FormControlLabel value="teacher" control={<Radio />} label="Teacher" onChange={(e) => { setRole(e.target.value) }}></FormControlLabel>
                </RadioGroup>
            </div>
            <div className={css.formElement}>
                <FormLabel id="school" className={css.label}>School</FormLabel>
                <Select 
                    aria-labelledby="school" 
                    name="school" 
                    defaultValue="none"
                    onChange={e => {setSchool(e.target.value)}}
                >
                    <MenuItem value="none" disabled>
                        <em>Select School</em>
                    </MenuItem>
                    {schools.map(school => 
                        <MenuItem value={school._id} key={school._id} selected>{school.name}</MenuItem>
                    )}
                </Select>
            </div>
            <div className={css.formElement}>
                <FormLabel id="startYear">Start year</FormLabel>
                <TextField 
                    type="text"
                    min={1950} 
                    max={2100} 
                    name="startYear"
                    value={startYear}
                    aria-labelled-by="startYear"
                    onChange = {(e) => {
                        setStartYear(e.target.value)
                    }}
                ></TextField>
            </div>
            <Button variant="contained" type="submit" className={css.button}>Submit</Button>
        </form>
    </div>)

}

export default RegistrationPage