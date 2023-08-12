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
        product_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
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