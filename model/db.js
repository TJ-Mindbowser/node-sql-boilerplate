const { Sequelize, DataTypes } = require('sequelize');
const { database, username, password, host } = require('../const');
const fs = require('fs');
const path = require('path');
const filebasename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql'
});
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        fs
            .readdirSync(__dirname)
            .filter((file) => {
                const returnFile = (file.indexOf('.') !== 0)
                    && (file !== filebasename)
                    && (file.slice(-3) === '.js');
                return returnFile;
            })
            .forEach((file) => {
                const model = require(path.join(__dirname, file))(sequelize, DataTypes)
                db[model.name] = model;
            });
        Object.keys(db).forEach((modelName) => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });
        sequelize.sync({
            force: false,
            alter: false
        })
            .catch((err) => {
                console.log(err);
                process.exit();
            });
        db.sequelize = sequelize;
        db.Sequelize = Sequelize;
    })
    .catch((error) => {
        console.log("🚀 ~ file: db.js:12 ~ error", error)
    })
module.exports = db;
