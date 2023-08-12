const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    logging: false,
    dialect: "mysql",

  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// Define your models
db.User = require("../models/User")(sequelize, DataTypes);
db.UserDetails = require("../models/UserDetails")(sequelize, DataTypes);
db.Category = require('../models/Category')(sequelize,DataTypes);
db.Product = require('../models/Product')(sequelize,DataTypes);
db.Order = require('../models/Order')(sequelize,DataTypes);
db.OrderItem = require('../models/OrderItem')(sequelize,DataTypes);
/* Relation or Associations between models */
db.User.hasOne(db.UserDetails, { foreignKey: 'user_id' });
db.UserDetails.belongsTo(db.User);

(async () => {
  try {
    await sequelize.authenticate();
    // console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });
    // console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
})();

module.exports = db;