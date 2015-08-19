var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.dbName, process.env.username, process.env.password, {
    port: process.env.port,
    dialect: "mysql"
});

function Model(Sequelize, sequelize) {
    this.Sequelize = Sequelize;
    this.sequelize = sequelize;
}
Model.prototype = {
    constructor: Model
};
module.exports = new Model(Sequelize, sequelize);