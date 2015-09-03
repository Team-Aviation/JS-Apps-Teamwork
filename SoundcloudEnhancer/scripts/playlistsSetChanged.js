import {validator} from './validator.js';

var playlistsSet = (function(){

    var playlistsSetObject = {
        init: function(playlists) {
            this.playlists = playlists;

            return this;
        },
        get playlists(){
            return this._playlists;
        },
        set playlists(value){
            // validator.validatePlaylists(value, 'Playlists array');

            this._playlists = value;
        },
        searchPlaylists: function(patterns){
            validator.validatePatterns(patterns, 'Search playlist strings');

            var patternsCaseInsensitive = patterns.map(function(pat){ return pat.toLowerCase();});

            return this.playlists.filter(
                function(pl){
                    var foundPlaylist = true;

                    for (var index in patternsCaseInsensitive) {
                        if (pl.name.toLowerCase().indexOf(patternsCaseInsensitive[index]) < 0) {
                            foundPlaylist = false;
                        }
                    }

                    return foundPlaylist;
                }
            );
        },
        addNewPlaylist: function(playlist){
            validator.validateIfUndefined(playlist, 'Playlist to be added');
            validator.validateIfPlaylist(playlist, 'Playlist to be added');

            this.playlists.push(playlist);

            return this;
        },
        removePlaylist: function(playlist){
            var playlistExists = this.playlists.some(function(pl){
                return pl.id === playlist.id;
            });

            validator.validateIfUndefined(playlist, 'Playlist to be removed');
            validator.validateIfPlaylist(playlist, 'Playlist to be removed');

            if (playlistExists) {
                this.playlists.splice(this.playlists.indexOf(playlist, 1));
            }

            return this;
        }
    };

    return playlistsSetObject;
}());

export {playlistsSet};