var Connector = require('./Connector');

var Redis = {
    _client: Connector.Redis(),

    _key_generator: function (data) {
        var keys = Object.keys(data)
        // var keys = Object.new || undefined;
        return keys[0] + ':' + data[keys[0]]
    },

    add_zadd: function (zadd, callback) {
        var key = this._key_generator(zadd.key);
        console.log(zadd.key, key);
        this._client.zadd(key, 0, JSON.stringify(zadd.data), function (err, data) {
            if (err) {
                console.log("err add:", err);
                return callback(err);
            } else {
                console.log("success add:");
                return callback(true);
            }
        });
    },

    update_zincrby: function (zincrby, callback) {
        var key = this._key_generator(zincrby.key);
        console.log(zincrby.key)
        this._client.zincrby(key, 0, JSON.stringify(zincrby.data), function (err, data) {
            if (err) return callback(err);
            else {
                return callback(data);
            }
        });
    },

    get_zrange: function (zrange, callback) {
        var key = this._key_generator(zrange.key);
        console.log(callback);
        console.log(zrange.key);
        this._client.zrange(key, 0, -1, function (err, data) {
            if (err) return callback(err);
            else {
                return callback(data);
            }
        });
    },

    delete_zrem: function (zrem, callback) {
        var key = this._key_generator(zrem.key);
        console.log(key, zrem);
        this._client.zrem(key, zrem.data.deleteData, function (err, data) {
            if (err) return callback(err);
            else {
                console.log("console==",data)
                return callback(data);
            }
        });
    },
    //     ZREM_delete_zrem: function (key, callback) {
    //         this._client.zrem(this._key_generator(key), function (err, reply) {
    //             if (err) return false;
    //             else
    //                 return callback(reply);
    //         });
    //     }
};

module.exports = Redis;