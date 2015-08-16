/**
 *  Define the Model that all models inherit.
 */
var mysql = require("mysql");
function Model() {
    this.opts = {
        host: process.env.OPENSHIFT_MYSQL_DB_HOST,
        user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
        port: process.env.OPENSHIFT_MYSQL_DB_PORT,
        password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
        database: process.env.OPENSHIFT_GEAR_NAME
    };
//     console.log('Connection opts: ' + JSON.stringify(this.opts));
    this.connection = mysql.createConnection(this.opts, function(err) {
        // connected! (unless `err` is set)
        console.log('Connection Creation Error: ' + err);
    });
    this.connection.connect();
}

Model.prototype = {
    constructor: Model,
    query: function(query, callback) {
        if(this.connection) {
            this.connection.query(query, function(err, rows, fields) {
                if(err) throw err;
                callback(rows);
            });
        }
    }
};

module.exports = new Model();