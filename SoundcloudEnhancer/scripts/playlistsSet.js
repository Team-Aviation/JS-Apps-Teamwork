import {validator} from './validator.js';

var playlistsSet = (function(){

    var playlistsSetObject = {
        init: function(playlists) {
            this.playlistsList = playlists;

            return this;
        },
        get playlistsList(){
            return this._playlistsList;
        },
        set playlistsList(value){
            validator.validatePlaylists(value, 'Playlists array');

            this._playlistsList = value;
        },
        searchPlaylists: function(patterns){
            validator.validatePatterns(patterns, 'Search playlist strings');

            var patternsCaseInsensitive = patterns.map(function(pat){ return pat.toLowerCase();});

            var result = [];

            var i, j, lenI, lenJ;
            for (i = 0, lenI = patternsCaseInsensitive.length; i < lenI; i += 1) {
                for (j = 0, lenJ = this.playlistsList.length; j < lenI; j += 1) {
                    if (this.playlistsList[j]["_name"].toLowerCase().indexOf(patternsCaseInsensitive[i]) >= 0) {
                        result.push(this.playlistsList[j]);
                    }
                }
            }

            return result;
        },
        addNewPlaylist: function(playlist){
            validator.validateIfUndefined(playlist, 'Playlist to be added');
            validator.validateIfPlaylist(playlist, 'Playlist to be added');

            this.playlistsList.push(playlist);

            return this;
        },
        removePlaylist: function(playlist){
            var playlistExists = this.playlistsList.some(function(pl){
                return pl.id === playlist.id;
            });

            validator.validateIfUndefined(playlist, 'Playlist to be removed');
            validator.validateIfPlaylist(playlist, 'Playlist to be removed');

            if (playlistExists) {
                this.playlistsList.splice(this.playlistsList.indexOf(playlist, 1));
            }

            return this;
        }
    };

    return playlistsSetObject;
}());

export {playlistsSet};
