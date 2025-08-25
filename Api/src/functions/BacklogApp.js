const { app } = require('@azure/functions');

app.http('BacklogApp', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: "status",
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        return { 
            status: 200,
         };
    }
});
