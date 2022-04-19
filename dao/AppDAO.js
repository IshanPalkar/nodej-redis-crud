var redis = require('../libraries/Redis');

var AppDAO = {

    add_user: function (data, callback) {
        var id = data.id;
        var extract = {
            id: id,
            firstname: data.firstname,
            lastname: data.lastname,
            age: data.age
        };

        redis.add_zadd({ key: { "id": id }, data: extract }, function (resp) {
            if (resp) {
                return callback({ err: false, response: "Data was added successfully " }, 200);
            } else {
                return callback({ err: true, response: "User was not added successfully " }, 400);
            }
        })
    },

    get_user: function (data, callback) {
        redis.get_zrange({ key: { "id": data.id }, data: data }, function (resp) {
            if (resp) {
                return callback({ err: false, response: "Data was added successfully ", resp }, 200);
            } else {
                return callback({ err: true, response: "User was not added successfully " }, 400);
            }
        })

    },

    update_user: function (id, data, callback) {
        redis.update_zincrby({ key: { "id": id }, data: data }, function (resp) {
            if (resp) {
                return callback({ err: false, response: "User was updated successfully " }, 200);
            } else {
                return callback({ err: true, response: "User was not updated successfully " }, 400);
            }
        })
    },

    delete_user: function (data, callback) {
        console.log("data:", data);
        redis.delete_zrem({ key: { "id": data.id }, data: data.data }, function (resp) {
            if (resp) {
                return callback({ err: false, response: "User was deleted successfully " }, 200);
            } else {
                return callback({ err: true, response: "No user found with ID" }, 404);
            }
        })
    }

};

module.exports = AppDAO;