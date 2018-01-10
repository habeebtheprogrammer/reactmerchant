const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./models/config');
const logger = require('morgan');
const users = require('./controllers/user');



// http://mongoosejs.com/docs/promises.html
// mongoose.Promise = global.Promise;



var option = {
    server: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};

mongoose.connect(config.dbUrl, option).then('log connection successful');


const app = express();
var router = express.Router();


// if (app.get('env') !== 'production') app.use(logger('dev'));


//-- Middleware --
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));




router.route('/users')
    .get(users.getUsers)
    .post(users.createUser);

router.route('/users/:id')
    .get(users.getUserById)
    .put(users.updateUser)
    .delete(users.deleteUserById);

router.route('/users/phone/:phone')
    .delete(users.deleteUserByPhone);


module.exports = router;
