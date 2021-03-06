import {constants} from './constants.js';

var validator = (function () {
    // Checking if the module is successfully loaded
    console.log('Validator successfully loaded!');

    function isValidUrl(url) {
        var validPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

        return validPattern.test(url);
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
            if (!(track.hasOwnProperty('_id') &&
                track.hasOwnProperty('_name') &&
                track.hasOwnProperty('_url'))
            ) {
                throw new Error(trackName + ' is not a valid track object');
            }
        },
        validateIfPlaylist: function (playlist, playlistName) {
            playlistName = playlistName || 'Value';

            this.validateIfObject(playlist, playlistName);
            if (!(playlist.hasOwnProperty('_id') &&
                playlist.hasOwnProperty('_name') &&
                playlist.hasOwnProperty('_genres') &&
                playlist.hasOwnProperty('_tracksList') &&
                playlist.hasOwnProperty('_trackRequests') &&
                playlist.hasOwnProperty('addNewTrack') &&
                playlist.hasOwnProperty('removeTrack') &&
                typeof playlist.addNewTrack === 'function' &&
                typeof playlist.removeTrack === 'function')
            ) {
                throw new Error(playlistName + ' is not a valid playlist object');
            }
        },
        validateIfPlaylistsSet: function (playlistSet, playlistSetName) {
            playlistSetName = playlistSetName || 'Value';

            this.validateIfObject(playlistSet, playlistSetName);
            if (!(playlistSet.hasOwnProperty('_playlists') &&
                playlistSet.hasOwnProperty('searchPlaylists') &&
                playlistSet.hasOwnProperty('addNewPlaylist') &&
                playlistSet.hasOwnProperty('removePlaylist') &&
                typeof playlistSet.searchPlaylists === 'function' &&
                typeof playlistSet.addNewPlaylist === 'function' &&
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
                this.validateIfString(genres[index], genresName + ' at index ' + index);
            }
        },
        validateTracks: function (tracks, tracksName) {
            tracksName = tracksName || 'Value';

            this.validateIfUndefined(tracks, tracksName);
            this.validateIfArray(tracks, tracksName);
            for (var index in tracks) {
                this.validateIfTrack(tracks[index], tracksName + ' at index ' + index);
            }
        },
        validatePlaylists: function (playlists, playlistsName) {
            playlistsName = playlistsName || 'Value';

            this.validateIfUndefined(playlists, playlistsName);
            this.validateIfArray(playlists, playlistsName);
            for (var index in playlists) {
                this.validateIfPlaylist(playlists[index], playlistsName + ' at index ' + index);
            }
        },
        validateUsername: function (username, usernameName) {
            usernameName = usernameName || 'Value';

            this.validateStringNotEmpty(username, usernameName);
            if (username.length < constants.MIN_USERNAME_LENGTH || constants.MAX_USERNAME_LENGTH < username.length) {
                throw new Error(usernameName + ' must be between ' + constants.MIN_USERNAME_LENGTH + ' and ' + constants.MAX_USERNAME_LENGTH);
            }
        },
        validatePlaylistsSet: function (playlistsSet, playlistsSetName) {
            playlistsSetName = playlistsSetName || 'Value';

            this.validateIfUndefined(playlistsSet, playlistsSetName);
            for (var index in playlistsSet.playlists) {
                this.validateIfPlaylist(playlistsSet[index], playlistsSetName + ' at index ' + index);
            }
        },
        validatePatterns: function (patterns, patternsName) {
            patternsName = patternsName || 'Value';

            this.validateIfUndefined(patterns, patternsName);
            this.validateIfArray(patterns, patternsName);
            for (var index in patterns) {
                this.validateIfString(patterns[index], patternsName + ' at index ' + index);
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
