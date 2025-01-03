import mongoose from 'mongoose';
import { title } from 'process';

const TaskSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            
            maxlength: [40, 'Title can not be more than 40 characters']
        },

        description: {
            type: String,
            required: true,
            
            maxlength: [300, 'Description can not be more than 300 characters']
        },

        dueDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Active', 'Anactive' ],
            default: 'Active'
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'low'
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }

    },
    {timestamps: true}

);

const TaskModel = mongoose.model('Task', TaskSchema);
export default TaskModel;