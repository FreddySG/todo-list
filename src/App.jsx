import React, {useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'

import { generate as id } from 'shortid'
import allColors from './styles/colors'
import FormTask from './components/FormTask'
import Task from './components/Task'


const GlobalSyle = createGlobalStyle`
    body{
        font-family:sans-serif;
        background-color: #F27D07;
        color:${allColors.mainColor};
        text-align: center;
        margin:0;
    }
`

const App = () => {

    const [colorSelected, setColorSelected] = useState(allColors.colors[0])
    const [tasks, setTasks] = useState([])
    
    
    const url ="https://demo6193376.mockable.io/todos"
    const [todos,setTodos] = useState([])
    const fetchApi = async () =>{
        const response = await fetch(url)
        const responseJSON = await response.json()
        setTodos(responseJSON)
    }
    useEffect(() =>{
        fetchApi()
    },[])
        

    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.title.value.trim() !== '') {
            createNewTask(e.target.title.value)
            e.target.title.value = ''
        }
    }

    const createNewTask = (title) => {
        const newTask = {
            id: id(),
            title,
            color: colorSelected,
            done: false
        }

        const allTasks = [...tasks, newTask]

        setTasks(allTasks)
    }

    const handleCompleteTask = (id) => {
        const currentTasks = [...tasks]
        const task = currentTasks.find(task => task.id === id)
        const index = currentTasks.indexOf(task)

        currentTasks[index].done = !currentTasks[index].done

        setTasks(currentTasks)
    }

    const handleDeleteTask = (id) => {
        let currentTasks = [...tasks]
        currentTasks = currentTasks.filter(task => task.id !== id)

        setTasks(currentTasks)
    }

    const handleChangeColor = (color) => {
        setColorSelected(color)
    }


    return (
        <>
            <GlobalSyle />
            <h1>To do list</h1>
            <FormTask
                handleChangeColor={handleChangeColor}
                handleSubmit={handleSubmit}
                colorSelected={colorSelected}
            />
            <ul>
                { 
                    todos.map((todo,index)=>{
                        return <li>
                                    {todo.title} {todo.active ?'✔️': '❌'}{todo.prioridad ?'🔺': '🔻'}
                                </li>
                    })
                }
            </ul>
            
            {
                tasks.map(task => (
                    <Task
                        key={id()}
                        done={task.done}
                        title={task.title}
                        color={task.color}
                        handleCompleteTask={() => handleCompleteTask(task.id)}
                        handleDeleteTask={() => handleDeleteTask(task.id)}
                    />
                ))
            }
        </>

    )
}

export default App;