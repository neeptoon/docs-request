import React from "react";
import classes from "./Form.module.css";
import {useState, useEffect} from "react";
import {getWorkers} from "../../api";
import {useForm} from "react-hook-form"

const Form = () => {

    const [workers, setWorkers] = useState([]);
    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        reset();
    }




    useEffect(() => {
        getWorkers().then(data => setWorkers(data))
    }, [])



    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Документ
                    <input
                    type="text"
                    {...register('doc', {
                        required: true
                    })}
                />
                </label>
                <div>{errors?.doc && <p>Введи название документа</p>}</div>
                <label>
                    Работник
                    <select
                    {...register('worker', {
                        required: true
                    })}
                >
                    <option></option>
                    {workers.map(worker => <option key={worker.id} value={worker.name}>{worker.name}</option>)}
                </select>
                </label>
                <div>{errors?.worker && <p>Выбери работника</p>}</div>
                <button type="submit">Отправить запрос</button>
            </form>

        </>
    );
};

export default Form;