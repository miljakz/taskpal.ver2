// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    User.associate = (models) => {
        User.hasMany(models.Note);
    };

    return User;
};

// models/note.js
module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define('Note', {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Note.associate = (models) => {
        Note.belongsTo(models.User);
    };

    return Note;
};
