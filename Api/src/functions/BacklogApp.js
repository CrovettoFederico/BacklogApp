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

app.http('BacklogApp_GetAllTasks', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: "getAllTasks",
    handler: async (request, context) => {
        try{
            context.log('Fetching all tasks from the database...');
            const tasks = await Task.findAll();
            context.log(`Fetched ${tasks.length} tasks.`);
            return { 
                status: 200,
                jsonBody: tasks
            };
        }catch(error){
            context.error(`Error occurred while fetching tasks: ${error.message}`);
            return {
                status: 500,
                jsonBody: { error: 'Failed to fetch tasks' },
                statusText: error.message
            };
        }
    }
});

app.http('BacklogApp_GetTasksByUser', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: "getTasksByUser",
    handler: async (request, context) => {
        try{
            const phoneId = request.params.phoneId;

            context.log(`Fetching tasks for phone ID: ${phoneId}`);
            const tasks = await Task.findAll({ 
                include: [{
                    model: User,
                    where: { phoneId }
                }]
            });
            context.log(`Fetched ${tasks.length} tasks for phone ID: ${phoneId}`);
            return { 
                status: 200,
                jsonBody: tasks
            };
        }catch(error){
            context.error(`Error occurred while fetching tasks: ${error.message}`);
            return {
                status: 500,
                jsonBody: { error: 'Failed to fetch tasks' },
                statusText: error.message
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
            context.log('Fetching all users from the database...');
            const users = await User.findAll();
            context.log(`Fetched ${users.length} users.`);
            return { 
                status: 200,
                jsonBody: users
            };
        }catch(error){
            context.error(`Error occurred while fetching users: ${error.message}`);
            return {
                status: 500,
                jsonBody: { error: 'Failed to fetch users' },
                statusText: error.message
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
            
            context.log('Creating a new task...');            
            const taskData = await request.json();
            context.log('Task data received:', taskData);
            const task = await Task.create(taskData);
            return { 
                status: 200,
                jsonBody: task
            };
        }catch (error) {
            context.error("Error al crear Task:", error);
            return {
                status: 500,
                jsonBody: { error: error.message },
                statusText: error.message
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
        context.log("Finding Existing User", userData);
        const existingUser = await User.findOne({ where: { phoneId: userData.phoneId } });

        if (existingUser) {
            context.log("User already exists:", existingUser);
            return {
                status: 201,
                jsonBody: existingUser,
                statusText: 'User already exists'
            };
        }

        context.log('Creating new user...');
        const user = await User.create(userData);
        return { 
            status: 200,
            jsonBody: user
         };
    }catch (error) {
        context.error(`Error occurred while creating user: ${error.message}`);
        return {
            status: 500,
            jsonBody: { error: 'Failed to create user' },
            statusText: error.message
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
            context.log('Updating a task...');
            const taskData = await request.json();
            context.log('Task data received for update:', taskData);
            // Buscar la task por PK
            const task = await Task.findByPk(taskData.id);
            context.log('Task found:', task);

            if (!task) {
                context.res = {
                    status: 404,
                    jsonBody: { message: `Task con id ${taskData.id} no encontrada` },
                    statusText: error.message
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

            context.log('Updated task data:', task);
            // Guardar cambios
            await task.save();
            context.log('Task updated successfully:');
            return {
                status: 200,
                jsonBody: task
            };
        } catch (err) {
            context.error("Error al actualizar Task:", err);
            return {
                status: 500,
                jsonBody: { error: err.message },
                statusText: err.message
            };
        }
    }
});









