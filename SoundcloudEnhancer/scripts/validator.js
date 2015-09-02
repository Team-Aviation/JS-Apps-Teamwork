import {constants} from 'scripts/constants.js';

var validator = (function () {
    // Checking if the module is successfully loaded
    console.log('Validator successfully loaded!');

    function isValidUrl(url) {
        //TODO: validate URL

        return true;
    }

    return {
        validateIfUndefined: function (item, itemName) {
            itemName = itemName || 'Value';

            if (item === undefined) {
                throw new Error(itemName + ' is undefined');
            }
        },
        validateIfString: function (str, strName) {
            strName = strName || 'Value';

            if (typeof str !== 'string') {
                throw new Error(strName + ' is not a string');
            }
        },
        validateIfNumber: function (num, numName) {
            numName = numName || 'Value';

            if (typeof num !== 'number') {
                throw new Error(numName + ' is not a number');
            }
        },
        validateIfObject: function (obj, objName) {
            objName = objName || 'Value';

            if (!(typeof obj === 'object' && obj)) {
                throw new Error(objName + ' is not an object');
            }
        },
        validateIfArray: function (arr, arrName) {
            arrName = arrName || 'Value';

            if (!(Object.prototype.toString.call(arr) === '[object Array]')) {
                throw new Error(arrName + ' is not an array');
            }
        },
        validateIfTrack: function (track, trackName) {
            trackName = trackName || 'Value';

            this.validateIfObject(track, trackName);
            if (!(track.hasOwnProperty('_id') ||
                track.hasOwnProperty('_name') ||
                track.hasOwnProperty('_url'))
            ) {
                throw new Error(trackName + ' is not a valid track object');
            }
        },
        validateIfPlaylist: function (playlist, playlistName) {
            playlistName = playlistName || 'Value';

            this.validateIfObject(playlist, playlistName);
            if (!(playlist.hasOwnProperty('_id') ||
                playlist.hasOwnProperty('_name') ||
                playlist.hasOwnProperty('_genres') ||
                playlist.hasOwnProperty('_tracksList') ||
                playlist.hasOwnProperty('_trackRequests') ||
                playlist.hasOwnProperty('addNewTrack') ||
                playlist.hasOwnProperty('removeTrack') ||
                typeof playlist.addNewTrack === 'function' ||
                typeof playlist.removeTrack === 'function')
            ) {
                throw new Error(playlistName + ' is not a valid playlist object');
            }
        },
        validateIfPlaylistsSet: function (playlistSet, playlistSetName) {
            playlistSetName = playlistSetName || 'Value';

            this.validateIfObject(playlistSet, playlistSetName);
            if (!(playlistSet.hasOwnProperty('_playlists') ||
                playlistSet.hasOwnProperty('searchPlaylists') ||
                playlistSet.hasOwnProperty('addNewPlaylist') ||
                playlistSet.hasOwnProperty('removePlaylist') ||
                typeof playlistSet.searchPlaylists === 'function' ||
                typeof playlistSet.addNewPlaylist === 'function' ||
                typeof playlistSet.removePlaylist === 'function')
            ) {
                throw new Error(playlistSetName + ' is not a valid playlists set object');
            }
        },
        validateName: function (name, nameName) {
            nameName = nameName || 'Value';

            this.validateStringNotEmpty(name, nameName);
        },
        validateUrl: function (url, urlName) {
            urlName = urlName || 'Value';

            this.validateIfUndefined(url, urlName);
            this.validateIfString(url, urlName);
            if (!isValidUrl(url)) {
                throw new Error(urlName + ' is not a valid URL');
            }
        },
        validateGenres: function (genres, genresName) {
            genresName = genresName || 'Value';

            this.validateIfUndefined(genres, genresName);
            this.validateIfArray(genres, genresName);
            for (var index in genres) {
                if (!this.validateIfString(genres[index])) {
                    throw new Error(genresName + ' contains a non-string element at index ' + index);
                }
            }
        },
        validateTracks: function (tracks, tracksName) {
            tracksName = tracksName || 'Value';

            this.validateIfUndefined(tracks, tracksName);
            this.validateIfArray(tracks, tracksName);
            for (var index in tracks) {
                if (!this.validateIfTrack(tracks[index])) {
                    throw new Error(tracksName + ' contains a non-track element at index ' + index);
                }
            }
        },
        validatePlaylists: function (playlists, playlistsName) {
            playlistsName = playlistsName || 'Value';

            this.validateIfUndefined(playlists, playlistsName);
            this.validateIfArray(playlists, playlistsName);
            for (var index in playlists) {
                if (!this.validateIfPlaylist(playlists[index])) {
                    throw new Error(playlistsName + ' contains a non-playlist element at index ' + index);
                }
            }
        },
        validateUsername: function (username, usernameName) {
            usernameName = usernameName || 'Value';

            this.validateStringNotEmpty(username, usernameName);
        },
        validatePlaylistsSet: function (playlists, playlistsName) {
            playlistsName = playlistsName || 'Value';

            this.validateIfUndefined(playlists, playlistsName);
            this.validateIfArray(playlists, playlistsName);
            for (var index in playlists) {
                if (!this.validateIfPlaylistsSet(playlists[index])) {
                    throw new Error(playlistsName + ' contains a non-playlist element at index ' + index);
                }
            }
        },
        validatePatterns: function (patterns, patternsName) {
            patternsName = patternsName || 'Value';

            this.validateIfUndefined(patterns, patternsName);
            this.validateIfArray(patterns, patternsName);
            for (var index in patterns) {
                if (!this.validateIfString(patterns[index])) {
                    throw new Error(patternsName + ' contains a non-string element at index ' + index);
                }
            }
        },
        validateStringNotEmpty: function (string, stringName) {
            stringName = stringName || 'Value';

            this.validateIfUndefined(string, stringName);
            this.validateIfString(string, stringName);
            if (string.length < 1) {
                throw new Error(stringName + ' cannot be empty');
            }
        }
    };
}());

export {validator};
