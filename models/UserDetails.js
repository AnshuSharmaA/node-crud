module.exports = (sequelize,DataTypes)=>{
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
        timestamps: true
    });
}