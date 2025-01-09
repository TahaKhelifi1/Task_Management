import {createContext, useEffect} from 'react';
import React from 'react';
import axios from 'axios';
import { useUserContext } from './userContext';
import { get } from 'http';

const TasksContext =createContext();
const serverUrl = 'http://localhost:8000/api/v1';


export const TasksProvider = ({children}) => {
    const UserId = useUserContext().user.id;

    const [tasks, setTasks] = React.useState([ ]);
    const [loading, setLoading] = React.useState(false);
    const [task, setTask] = React.useState(null);

    const[priority,setPriority]=React.useState("all");


    //get tasks
    const getTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/tasks`);
        
            setTasks(response.data);
        } catch (error) {
            console.error("error getting tasks", error);
        }
        setLoading(false);
    };
    //get task
    const getTask = async (taskId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/tasks/${taskId}`);
        
            setTask(response.data);
        } catch (error) {
            console.error("error getting task", error);
        }
        setLoading(false);
    };

    //create task
    const createTask = async (task) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/task/create`, task);
            console.log("Task creatred",res.data)
            
        } catch (error) {
            console.error("error creating task", error);
        }
        setLoading(false);
    };

    //update task
    const updateTask = async (task) => {
        setLoading(true);
        try {
            const res = await axios.patch(`${serverUrl}/task/${task._id}`, task);
            const newTasks = tasks.map((task)=>{
                return task._id=== res.data._id ?res.data :task ;
            });
            setTasks(newTasks);
        } catch (error) {
            console.error("error updating task", error);
        }
        setLoading(false);
    };

    //deletetask 
    const deleteTask = async (taskId)=>{
        setLoading(true);
        try {
            await axios.delete(`${serverUrl}/task/${taskId}`);
            const newTasks = tasks.filter((task)=>task._id !== taskId);
            setTasks(newTasks);
            
        } catch (error) {
            console.error("error deleting task", error);
            
        }
    }

    useEffect(() => {
        getTasks();
        getTask("");
    }, [UserId]);


    return (
        <TasksContext.Provider value={{tasks,
        loading,
        task,
        createTask,
        updateTask,
        deleteTask,
        getTask,
        getTasks,
        priority,
        setPriority
        }}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => {
    return React.useContext(TasksContext);
}


