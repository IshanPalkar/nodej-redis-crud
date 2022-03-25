"use strict";

var Connector = require('./Connector');

var Redis = {
  _client: Connector.Redis(),
  _key_generator: function _key_generator(data) {
    var keys = Object.keys(data) || null; // var keys = Object.new || undefined;

    return keys[0] + ':' + data[keys[0]] || null;
  },
  add_zadd: function add_zadd(zadd, callback) {
    var key = this._key_generator(zadd.key);

    this._client.zadd(key, zadd.data, function (err, data) {
      if (err) return callback(err); else {
        return callback(true);
      }
    });
  },
  get_zincrby: function get_zincrby(zincrby, callback) {
    var key = this._key_generator(zincrby);
    console.log(zincrby.key);
    this._client.zincrby(key, zincrby.data, function (err, data) {
      if (err) return callback(err); else {
        return callback(true);
      }
    });
  },
  get_zrangeby: function get_zrangeby(zrangeby, callback) {
    var key = this._key_generator(zrangeby);
    console.log(zrangeby);
    this._client.zrangeby(key, zrangeby.data, function (err, data) {
      if (err) return callback(err);
      else {
        return callback(data);
      }
    });
  },
  delete_zrem: function delete_zrem(zrem, callback) {
    var key = this._key_generator(zrem);

    this._client.zrem(key, zrem.data, function (err, data) {
      if (err) return callback(err); else {
        return callback(true);
      }
    });
  } //     ZREM_delete_zrem: function (key, callback) {
  //         this._client.zrem(this._key_generator(key), function (err, reply) {
  //             if (err) return false;
  //             else
  //                 return callback(reply);
  //         });
  //     }

};
module.exports = Redis;