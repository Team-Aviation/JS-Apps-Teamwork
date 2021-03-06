import {validator} from './validator.js';

var user = (function(){
    // Checking if the module is successfully loaded
    console.log('User successfully loaded!');

    var userObject = {
        init: function(username, playlistsSet) {
            this.username = username;
            this.playlistsSet = playlistsSet;

            return this;
        },
        get username(){
            return this._username;
        },
        set username(value){
            validator.validateUsername(value, 'Username');

            this._username = value;
        },
        get playlistsSet(){
            return this._playlistsSet;
        },
        set playlistsSet(value){
            validator.validatePlaylistsSet(value, 'User playlists set');

            this._playlistsSet = value;
        }
    };

    return userObject;
}());

export {user};
