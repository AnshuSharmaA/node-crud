module.exports = (db) => {
    const {Category, Product} = db;
    Product.belongsTo(Category, { foreignKey: 'category_id' });
    Category.hasMany(Product);
};