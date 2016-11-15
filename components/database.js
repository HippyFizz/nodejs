var mysql = require('mysql');
var crypto = require('crypto');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users'
});

function Database() {
}

Database.prototype.connect = function (){
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        } else {
            console.log('connection done!');
        }
    });
};

Database.prototype.createUser = function (login, password, permission, username) {
    var hash = crypto.createHash('md5').update(password).digest('hex');
    if (username == undefined) {
        var new_user_data = {
            login: login,
            password: hash,
            permission: permission,
            username: login
        };
    } else {
        var new_user_data = {
            login: login,
            password: hash,
            permission: permission,
            username: username
        };
    }
    connection.query('INSERT INTO user SET ?', new_user_data, function (err, result) {
        if (err) throw err;
    });
}

Database.prototype.getUser = function (login, callback) {
    var sql = 'SELECT * FROM user WHERE login=\'' + login + '\'';
    console.log(sql);
    connection.query(sql, function (err, rows) {
        if (err) throw err;
        if (rows.length != 0) {
            rows.forEach(function (row) {
                var user = {
                    id: row.id,
                    username: row.username,
                    login: row.login,
                    password: row.password,
                    permission: row.permission
                };
                callback(user);
            });
        }
    });
}

Database.prototype.deleteUser = function (id) {
    var sql = 'DELETE FROM user WHERE id=' + id;
    connection.query(sql, function (err, rows) {
        if (err) throw err;
    });
}

Database.prototype.changeUserName = function (username, new_username) {
    var sql = 'UPDATE user SET username =\'' + new_username + '\' WHERE username=\'' + username + '\'';
    console.log(sql);
    connection.query(sql, function (err) {
        if (err) throw err;
    });
}

module.exports = Database;
