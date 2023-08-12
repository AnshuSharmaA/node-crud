module.exports = (sequalize, DataTypes) => {
    const Product = sequalize.define("Product", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'catogories',
                foreignKey: 'id',
            }
        }
    }, {
        tableName: 'products',
    }, {
        timestamp: true,
    })
    return Product;
}