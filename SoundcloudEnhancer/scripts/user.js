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

/*TODO: Unit Tests
- user is object
- user.init is function
- user.username is undefined exception
- user.username is not string exception
- user.username is empty string exception
- user.username is valid no exception
- user.playlistsSet is an object
- user.playlistsSet is undefined exception
- user.playlistsSet is not an array exception
- user.playlistsSet contains non-playlist exception
- user.playlistsSet is valid no exception
* */
