const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../database/database');

const UserDetails = sequelize.define('UserDetails', {
    address: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            foreignKey: 'id',
        }
    }
}, {
    tableName: 'user_details'
}, {
    timestamps: true
});
(async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database: ", error);
    }
})();
module.exports = UserDetails;