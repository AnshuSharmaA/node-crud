module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
        order_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'orders',
                foreignKey: 'id',
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products',
                foreignKey: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price_per_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        tableName: 'order_items'
    }, {
        timestamp: true
    });
    return OrderItem;
}