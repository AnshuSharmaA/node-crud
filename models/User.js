const bcrypt = require("bcrypt");

module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define(
        "User",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    max: {
                        args: [32],
                        msg: "Maximum 32 characters allowed in name",
                    },
                    min: {
                        args: [4],
                        msg: "Minimum 4 characters required in name",
                    },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
                unique: {
                    args: true,
                    msg: "Email address already in use!",
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'users',
            hooks: {
                beforeCreate: async (user) => {
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    user.password = hashedPassword;
                },
            },
            instanceMethods: {
                validPassword(password) {
                    return bcrypt.compare(password, this.password);
                },
            },
            timestamps: true,
        }
    );
    return User;
}
