module.exports = (sequalize, DataTypes) => {
    const Category = sequalize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
        {
            tableName: 'categories'
        }, {
        timestamp: true
    });
    return Category;
}