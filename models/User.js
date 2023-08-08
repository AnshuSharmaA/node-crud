const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/database')

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: {
                args: [32],
                msg: "Maximum 32 characters allowed in name"
            },
            min: {
                args: [4],
                msg: "Minimum 4 characters required in name"
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: true
});

(async () => {
    try {
        await sequelize.sync();
        console.log('User table created successfully!');
    } catch (error) {
        console.error('Unable to create table: ', error);
    }
})();

module.exports = User;