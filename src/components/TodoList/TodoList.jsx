import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import Card from '../Card/Card'
import "./TodoList.css"
let endpoint = "http://localhost:8080"

export default function TodoList() {
    const [value, setValue] = useState(0);
    const [tasks, setTasks] = useState([])
    const [message, setMessage] = useState("")
    const inputValue = useRef(null)


    useEffect(() => {
        axios.get(`${endpoint}/api/task`)
            .then(function (res) {
                console.log(res)
                setTasks(res.data)
                setValue(0)
            })
            .catch(function (err) {
                console.log(err)
            })
    }, [ value])

    // Done function
    function done(id) {
        axios.put(`${endpoint}/api/task/${id}`)
            .then(function (res) {
                reRender()
                console.log(res)
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    function undo(id) {
        axios.put(`${endpoint}/api/undo-task/${id}`)
            .then(function (res) {
                console.log(res)
                reRender()
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    function deleteOne(id) {
        axios.delete(`${endpoint}/api/delete-task/${id}`)
            .then(function (res) {
                console.log(res)
                reRender()
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    //create task
    function submit(event) {
        event.preventDefault()
        if (message) {
            axios.post(`${endpoint}/api/task`, {
                "status": false,
                "task": `${message}`
            })
                .then(function (res) {
                    clearInput()
                    reRender()
                    console.log(res)
                })
                .catch(function (err) {
                    console.log(err)
                })
                .finally(function () {
                    setMessage()
                })
        }

    }

    function clearInput() {
        inputValue.current.value = ""
    }


    function reRender() {
        setValue(prevValue => prevValue + 1)
        console.log(value)
    }

    return (
        <div className='root-contianer'>
            <div className='heading'>Todo</div>
            <div className='operation-field'>
                <form onSubmit={submit} className="form">
                    <input ref={inputValue} onChange={(event) => setMessage(event.target.value)}></input>
                    <button >Add</button>
                </form>
            </div>
            <div className='wrap'>
                <div className='todo-list'>
                    {
                        tasks == null ?
                            "Empty"
                            :
                            tasks.map((item) => {
                                return (
                                    <Card
                                        status={item.status}
                                        id={item._id}
                                        task={item.task}
                                        key={item._id}
                                        done={done}
                                        undo={undo}
                                        deleteOne={deleteOne}
                                    />
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}
