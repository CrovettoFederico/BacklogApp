const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.Db, process.env.Db_User, process.env.Db_Pass, {
  host: process.env.Db_Host,
  username: process.env.Db_User,
  password: process.env.Db_Pass,
  database: process.env.Db,
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true
    }
  }
});

module.exports = sequelize;