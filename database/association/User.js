module.exports = (db) => {
    const { User, UserDetails } = db;
    User.hasOne(UserDetails, { foreignKey: 'user_id' });
    UserDetails.belongsTo(User);
};