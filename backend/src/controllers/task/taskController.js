import asyncHandler from 'express-async-handler';
import TaskModel from '../../models/tasks/TaskModel.js';

export const createTask = asyncHandler(async (req, res) => {
 
    try {
        const {title, description, dueDate, priority, status} = req.body;
        if (!title || title.trim() === "") {
            res.status(400).json({message: 'Title is required'});
        }
        if (!description || description.trim() === "") {
            res.status(400).json({message: 'Title is required'});
        }
        const task = new TaskModel({
            title,
            description,
            dueDate,
            priority,
            status,
            user: req.user._id
        });
        await task.save();
        res.status(201).json({message: 'Task created successfully', task});
    } catch (error) {
        console.log("Error in creating task", error.message);
        res.status(500).json({message:error.message});
    }
});

// get all tasks
export const getTasks = asyncHandler(async (req, res) => {

    try {
        const UserId= req.user._id;
        if (!UserId) {
            res.status(400).json({message: 'User id is required'});
        }
        const tasks = await TaskModel.find({user: UserId});
        res.status(200).json({
            length: tasks.length,
            tasks,
        });
    } catch (error) {
        console.log("Error in getting tasks", error.message);
        res.status(500).json({message:error.message});
        
    }
});
// get a single task
export const getTask = asyncHandler(async (req, res) => {
    try {
        const UserId = req.user.id;
        const{id} = req.params;
        if (!id) {
            res.status(400).json({message: 'Task id is required'});
        }
        const task = await TaskModel.findById(id);
        
        if (!task) {
            res.status(404).json({message: 'Task not found'});
        }

        if (!task.user.equals(UserId)) {
            res.status(403).json({message: 'Not authorized to view this task'});
        }

        res.status(200).json({task});

    } catch (error) {
        console.log("Error in getting task", error.message);
        res.status(500).json({message:error.message});

    }
} )  ;
// update a task
export const updateTask = asyncHandler(async (req, res) => {
    try {
        const UserId = req.user.id;
        const{id} = req.params;
        const {title, description, dueDate, priority, status, completed} = req.body;
        if (!id) {
            res.status(400).json({message: 'Please provide task id'})   ;

        }
        const task = await TaskModel.findById(id)  ;
        if (!task) {
            res.status(404).json({message: 'Task not found'});
        }
        // check if the user is the owner of the task
        if (!task.user.equals(UserId)) {
            res.status(403).json({message: 'Not authorized to update this task'});
        }
        // update the task with the new data    
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.completed = completed || task.completed;

        await task.save();
        res.status(200).json({message: 'Task updated successfully', task});

    } catch (error) {
        console.log("Error in updating task", error.message);
        res.status(500).json({message:error.message});
    }
});
// delete a task     
export const deleteTask = asyncHandler(async (req, res) => {
    try {
        const UserId = req.user.id;
        const{id} = req.params;
        const task = await TaskModel.findById(id);
        if (!task) {
            res.status(404).json({message: 'Task not found'});
        }
        // check if the user is the owner of the task
        if (!task.user.equals(UserId)) {
            res.status(403).json({message: 'Not authorized to delete this task'});
        }
        await TaskModel.findByIdAndDelete(id);
        res.status(200).json({message: 'Task deleted successfully'});
    } catch (error) {
        console.log("Error in deleting task", error.message);
        res.status(500).json({message:error.message});
    }
});