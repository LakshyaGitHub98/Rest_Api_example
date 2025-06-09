const User = require('../models/user');
async function handleGetAllUsers(req, res) {
    try {
        const result = await User.find({});
        // console.log('Fetched Users:', result);
        return res.json({ users: result });
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
};
async function handleCreateUsers(req, res) {
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
}  
async function handleGetUserById(req, res) {
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
}
async function handleUpdateUserbyId(req,res){
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
}
async function handleDeleteUserbyId(req, res) {
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
}
module.exports = {
    handleGetAllUsers,
    handleCreateUsers,
    handleGetUserById,
    handleUpdateUserbyId,
    handleDeleteUserbyId,
}   