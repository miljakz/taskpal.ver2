const express = require('express');
const { client, connectToDatabase } = require('./db');
const createUserModel = require('./models');

const app = express();
const port = 3000;

app.use(express.json());

// Connect to the MongoDB database
connectToDatabase();

// Create the user model
const userModel = createUserModel(client.db());

// Example endpoint to create a new user
app.post('/users', async (req, res) => {
    try {
        const userId = await userModel.createUser(req.body);
        res.json({ userId });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Example endpoint to get a user by ID
app.get('/users/:userId', async (req, res) => {
    try {
        const user = await userModel.getUser(req.params.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Your other routes and middleware go here

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Handle application termination (close the MongoDB connection)
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});
