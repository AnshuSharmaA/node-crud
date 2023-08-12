module.exports = (db) => {
    const { User, UserDetails, Category, Product} = db;
  
    User.hasOne(UserDetails, { foreignKey: 'user_id' });
    UserDetails.belongsTo(User);
    
    Product.belongsTo(Category, { foreignKey: 'category_id' });
    Category.hasMany(Product);
    
   
};