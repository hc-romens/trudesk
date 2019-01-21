/*
      .                              .o8                     oooo
   .o8                             "888                     `888
 .o888oo oooo d8b oooo  oooo   .oooo888   .ooooo.   .oooo.o  888  oooo
   888   `888""8P `888  `888  d88' `888  d88' `88b d88(  "8  888 .8P'
   888    888      888   888  888   888  888ooo888 `"Y88b.   888888.
   888 .  888      888   888  888   888  888    .o o.  )88b  888 `88b.
   "888" d888b     `V88V"V8P' `Y8bod88P" `Y8bod8P' 8""888P' o888o o888o
 ========================================================================
 Created:    01/04/2019
 Author:     Chris Brame

 **/
var _   = require('lodash');
var utils = require('../helpers/utils');

var sharedVars = require('./index').shared;

var events = {};

function register(socket) {
    events.showRestoreOverlay(socket);
    events.emitRestoreComplete(socket);
}

events.showRestoreOverlay = function(socket) {
    socket.on('$trudesk:restore:showOverlay', function() {
        if (global.socketServer && global.socketServer.eventLoop)
            global.socketServer.eventLoop.stop();

        utils.sendToAllConnectedClients(io, '$trudesk:restore:showOverlay');
    });
};

events.emitRestoreComplete = function(socket) {
    socket.on('$trudesk:restore:complete', function() {
        utils.sendToAllConnectedClients(io, '$trudesk:restore:complete');
        utils.disconnectAllClients(io);
        sharedVars.sockets = [];
        sharedVars.usersOnline = {};
        sharedVars.idleUsers = {};
    });
};

module.exports = {
    events: events,
    register: register
};