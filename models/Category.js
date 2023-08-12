module.exports = (sequalize, DataTypes) => {
    const Category = sequalize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
        {
            tableName: 'catogories'
        }, {
        timestamp: true
    });
    return Category;
}