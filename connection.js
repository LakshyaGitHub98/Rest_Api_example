const mongoose = require('mongoose');
async function connectToMongoDb(url) {
    return mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
}

module.exports ={
    connectToMongoDb,
}