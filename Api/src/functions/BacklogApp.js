const { app } = require('@azure/functions');
const sequelize = require("../../DbConnect/db");
const User = require("../../DbConnect/User");
const Task = require("../../DbConnect/Task");

app.http('BacklogApp_Status', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: "status",
    handler: async (request, context) => {        
        return { 
            status: 200,
         };
    }
});


app.http('BacklogApp_GetTasks', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: "getTasks",
    handler: async (request, context) => {
        try{
            const tasks = await Task.findAll();
            return { 
                status: 200,
                jsonBody: tasks
            };
        }catch{
            context.log(`Error occurred while fetching tasks: ${error.message}`);
            return {
                status: 500,
                jsonBody: { error: 'Failed to fetch tasks' }
            };
        }
    }
});

app.http('BacklogApp_GetUsers', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: "getUsers",
    handler: async (request, context) => {
        try{
            const users = await User.findAll();
            return { 
                status: 200,
                jsonBody: users
            };
        }catch{
            context.log(`Error occurred while fetching users: ${error.message}`);
            return {
                status: 500,
                jsonBody: { error: 'Failed to fetch users' }
            };
        }

        
    }
});

app.http('BacklogApp_PostTask', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: "PostTask",
    handler: async (request, context) => {
        try{
            const taskData = await request.json();
            const task = await Task.create(taskData);
            return { 
                status: 200,
                jsonBody: task
            };
        }catch (error) {
            context.log(`Error occurred while creating task: ${error.message}`);
            return {
                status: 500,
                jsonBody: { error: 'Failed to create task' }
            };
        }
    }
});

app.http('BacklogApp_PostUser', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: "PostUser",
    handler: async (request, context) => {
    try{
        const userData = await request.json();
        const user = await User.create(userData);
        return { 
            status: 200,
            jsonBody: user
         };
    }catch (error) {
        context.log(`Error occurred while creating user: ${error.message}`);
        return {
            status: 500,
            jsonBody: { error: 'Failed to create user' }
        };
    }
    }
});



app.http('BacklogApp_UpdateTask', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: "UpdateTask",
    handler: async (request, context) => {
        try {
            const taskData = await request.json();

            // Buscar la task por PK
            const task = await Task.findByPk(taskData.id);

            if (!task) {
            context.res = {
                status: 404,
                jsonBody: { message: `Task con id ${taskData.id} no encontrada` }
            };
            return;
            }

            // Actualizar campos permitidos
            if (taskData.title !== undefined) task.title = taskData.title;
            if (taskData.description !== undefined) task.description = taskData.description;
            if (taskData.deadline !== undefined) task.deadline = taskData.deadline;
            if (taskData.isFinished !== undefined) task.isFinished = taskData.isFinished;
            if (taskData.isDeleted !== undefined) task.isDeleted = taskData.isDeleted;
            if (taskData.finishedAt !== undefined) task.finishedAt = taskData.finishedAt;

            // Guardar cambios
            await task.save();

            return {
                status: 200,
                jsonBody: task
            };
        } catch (err) {
            context.log.error("Error al actualizar Task:", err);
            return {
                status: 500,
                jsonBody: { error: err.message }
            };
        }
    }
});









