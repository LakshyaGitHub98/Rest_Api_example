const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs');
const port = 8000;
const { log } = require('console');

// Middleware
app.use(express.urlencoded({ extended: false }));

// Define Mongoose Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    jobTitle: { type: String, required: true },
    gender: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/lakshya')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.route('/api/users')
    .get(async (req, res) => {
        try {
        const result = await User.find({});
        // log('Fetched Users:', result);
        return res.json({ users: result });
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
    })
    .post(async (req, res) => {
        const { firstName, lastName, email, jobTitle } = req.body;
        if (!firstName || !email || !jobTitle) {
            return res.status(400).send('Bad Request: Missing required fields');
        }

        try {
            const newUser = await User.create({ firstName, lastName, email, jobTitle });
            return res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            return res.status(500).json({ error: 'Error creating user', details: error.message });
        }
    })
    .patch((req, res) => {
        return res.status(501).send('Not Implemented');
    })
    .delete((req, res) => {
        return res.status(501).send('Not Implemented');
    });

app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <html>
    <head>
        <title>Users</title>
    </head>
    <body>
        <h1>Users</h1>
        <ul>
            ${allDbUsers.map(user => `<li>${user.firstName} ${user.lastName}</li>`).join('')}
        </ul>
    </body>
    </html>
    `;
    return res.send(html);
});

app.route('/api/users/:id')
    .get(async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId);
            // console.log('User ID:', userId);
            
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json({ user });
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching user', details: error.message });
        }
    })
    .patch(async (req, res) => {
        const userId = req.params.id;
        const { firstName, lastName, email, jobTitle ,gender} = req.body;
        if (!firstName || !email || !jobTitle) {
            return res.status(400).send('Bad Request: Missing required fields');
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName, email, jobTitle , gender}, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            return res.status(500).json({ error: 'Error updating user', details: error.message });
        }
    })
    .delete(async (req, res) => {
        const userId = req.params.id;
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.json({ message: 'User deleted successfully', user: deletedUser });
        } catch (error) {
            return res.status(500).json({ error: 'Error deleting user', details: error.message });
        }
    });
// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});