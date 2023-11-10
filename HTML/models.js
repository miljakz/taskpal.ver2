const { ObjectId } = require('mongodb');

function createUserModel(db) {
    const users = db.collection('users');

    async function createUser(userData) {
        const result = await users.insertOne(userData);
        return result.insertedId;
    }

    async function updateUser(userId, updateData) {
        await users.updateOne({ _id: ObjectId(userId) }, { $set: updateData });
    }

    async function getUser(userId) {
        return users.findOne({ _id: ObjectId(userId) });
    }

    return { createUser, updateUser, getUser };
}

module.exports = createUserModel;
