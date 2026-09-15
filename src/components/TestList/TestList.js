import css from "./TestList.module.css";
import { useEffect } from "react";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllTests, selectTestLoaded } from "../../redux/test/selectors";
import { selectValue } from "../../redux/testFilter/selectors";
import { deleteTest, fetchTeacherTests, fetchTests, removeTest } from "../../redux/test/operations";
import { refreshUser } from "../../redux/auth/operations";


function TestList() {

    const { user } = useAuth();
    const navigate = useNavigate();
    const tests = useSelector(selectAllTests);
    const loaded = useSelector(selectTestLoaded);
    const filter = useSelector(selectValue);
    const dispatch = useDispatch();

    useEffect(() => {

        const loadData = async () => {

            try{
                if (user.role === "teacher") {
                    await dispatch(fetchTeacherTests(user._id)).unwrap();
                } else {
                    await dispatch(fetchTests()).unwrap();
                }
            } catch(e){
                console.log(e);
            }
            
        }

        loadData();
        
    }, [user])

    if(!loaded){
        return <div>Test data is loading! Please wait!</div>
    }

    const filteredTests = tests.filter(test => test.title.startsWith(filter));

    return <>
        {filteredTests.map(test => {
            return <div key={test._id} className={css.container}>
                <p>{test.title}</p>
                <div className={css.actions}>
                    <button onClick={() => {
                        //Do nothing
                    }}>Start</button>

                    {user.role == 'teacher' && 
                        <button onClick={() => {
                            navigate(`/index/edit_test/${test._id}`);
                        }}>Edit</button>
                    }
                    {user.role == 'teacher' && 
                        <button onClick={() => {
                            dispatch(deleteTest(test._id));
                        }}>Delete</button>
                    }
                </div>
            </div>
        })}
    </>
}

export default TestList;