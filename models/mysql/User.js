var bcrypt = require('bcrypt-nodejs');
var model = require('./Model');
var Users = model.sequelize.define('appsumo_users', {
    email: model.Sequelize.STRING,
    password: model.Sequelize.STRING
});
Users.sync().then(function() {
    // Table created
    userModel.getUser('admin@appsumo.com', function(user) {
        //seed it with an admin user only if admin user doesn't exist
        if(user === null) {
            return Users.create({
                email: 'admin@appsumo.com',
                password: userModel.generateHash('Un1corn')
            });
        }
    });
});

function User_Model() {}
User_Model.prototype = {
    constructor: User_Model,
    getUser: function(email, callback) {
        Users.findOne({
            where: {
                "email": email
            }
        }).then(function(user) {
            callback(user);
        })
    },
    generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
    }
};
var userModel = new User_Model();
module.exports = userModel;