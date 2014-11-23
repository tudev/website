var Sequelize = require('sequelize');

var MODEL_ID = 'User';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                userName:               Sequelize.STRING,
                password:               Sequelize.STRING,
                firstName:              Sequelize.STRING,
                lastName:               Sequelize.STRING,
                templeEmailAddress:     {
                    type:       Sequelize.STRING,
                    validate:   {
                        isEmail: true
                    }
                },
                personalEmailAddress:   {
                    type:       Sequelize.STRING,
                    validate:   {
                        isEmail: true
                    }
                },
                twitter:                Sequelize.STRING,
                github:                 Sequelize.STRING,
                bio:                    Sequelize.TEXT
            });
        }
        return model;
    }
};