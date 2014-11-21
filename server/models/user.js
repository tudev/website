var Sequelize = require('sequelize');

var MODEL_ID = 'User';

var model;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (model) return model;
        else {
            model = db.define(MODEL_ID, {
                userName: Sequelize.STRING,
                password: Sequelize.STRING
            });
        }
    }
};