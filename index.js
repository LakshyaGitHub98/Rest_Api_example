const express = require('express');
const { logReqRes } = require('./middlewares');
const { connectToMongoDb } = require('./connection');
const app = express();
const port = 8000;
const userRoute=require('./routes/user');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));

// Connect to MongoDB
connectToMongoDb('mongodb://localhost:27017/rest_api_01');

// Routes
app.use('/api/users', userRoute);

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});