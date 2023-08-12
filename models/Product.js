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
    // Define the accessor method
    Product.prototype.getProductImageURL = function (protocol, hostname) {
        return this.product_image ? `${protocol}://${hostname}/public/${this.product_image}` : `${protocol}://${hostname}/public/dummy.jpg`;
    };
    return Product;
}