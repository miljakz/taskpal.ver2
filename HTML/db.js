const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://zmiljak47:<password>@zmiljak.gh6lfvd.mongodb.net/';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}

// Export the connected client and the connection function
module.exports = { client, connectToDatabase };
