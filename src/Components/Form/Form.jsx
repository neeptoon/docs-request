import React from "react";
import classes from "./Form.module.css";
import {useState, useEffect} from "react";
import {getWorkers, sendOrder} from "../../api";
import {useForm} from "react-hook-form";


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
        sendOrder(data)
        reset();
    }




    useEffect(() => {
        getWorkers().then(data => setWorkers(data))
    }, [])



    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Наименование документа
                    <input
                    type="text"
                    {...register('doc', {
                        required: true
                    })}
                />
                </label>
                <div>{errors?.doc && <p>Введи название документа</p>}</div>
                <label>
                    ФИО Конструктора
                    <select
                    {...register('workerID', {
                        required: true
                    })}
                >
                    <option></option>
                    {workers.map(worker => <option key={worker.id} value={worker.id}>{worker.name}</option>)}
                </select>
                </label>
                <div>{errors?.worker && <p>Выбери работника</p>}</div>
                <button type="submit">Отправить запрос</button>
            </form>

        </>
    );
};

export default Form;