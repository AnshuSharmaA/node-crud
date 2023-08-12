module.exports = (sequalize,DataType)=>{
    const Order = sequalize.define("Order",{
        user_id:{
            type:DataType.INTEGER,
            references:{
                model:'users',
                foreignKey:'id'
            }
        },
        date:{
            type:DataType.DATE,
            allowNull:false
        },
        amount:{
            type:DataType.INTEGER,
            allowNull:false,
        },
        status:{
            type:DataType.STRING,
            allowNull:false,
        },
    },{
        tableName:'orders'
    },{
        timestamp:true
    });
    return Order;
}