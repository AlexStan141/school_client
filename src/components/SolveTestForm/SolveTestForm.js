import css from "./SolveTestForm.module.css";
import { useEffect, useState } from "react";

function formatTime(nrSeconds){
    let minutes = Math.floor(nrSeconds / 60);
    let seconds = nrSeconds - minutes * 60;

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}

const SolveTestForm = () => {

    const [nrSeconds, setNrSeconds] = useState(3);

    useEffect(() => {
        if (nrSeconds <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setNrSeconds(nrSeconds - 1);
        }, [1000]);

        return () => clearInterval(timer);
    })

    return <p>{formatTime(nrSeconds)} seconds</p>

}

export default SolveTestForm