"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMessageToUser = exports.getData = exports.removeUsername = exports.addUser = exports.usernameAvailable = void 0;
var uuid_1 = require("uuid");
var users = [];
function usernameAvailable(username, clientID) {
    if (!users)
        return !!username;
    if (!users.some(function (user) { return username === user.username; })) {
        addUser(username, clientID);
        return true;
    }
    return false;
}
exports.usernameAvailable = usernameAvailable;
function addUser(username, clientID) {
    users.push({ username: username, clientID: clientID, messages: [] });
}
exports.addUser = addUser;
function removeUsername(clientID) {
    users = users.filter(function (user) { return user.clientID !== clientID; });
}
exports.removeUsername = removeUsername;
function getData() {
    return users;
}
exports.getData = getData;
;
function addMessageToUser(username, message) {
    var updatedArr = users.map(function (user) {
        if (user.username === username) {
            var newMessage = {
                id: uuid_1.v4(),
                message: message,
                time: Date.now()
            };
            user.messages = __spreadArrays(user.messages, [newMessage]);
        }
        return user;
    });
    users = updatedArr;
}
exports.addMessageToUser = addMessageToUser;
