var playlist = (function(){
    var previousID = 1;

    var validator = {
        validateIfUndefined: function(item, itemName){
            itemName = itemName || 'Value';

            if (item === undefined) {
                throw new Error(itemName + ' is undefined');
            }
        },
        validateIfString: function(str, strName){
            strName = strName || 'Value';

            if (typeof str !== 'string') {
                throw new Error(strName + ' is not a string');
            }
        },
        validateIfNumber: function(num, numName){
            numName = numName || 'Value';

            if (typeof num !== 'number') {
                throw new Error(numName + ' is not a number');
            }
        },
        validateIfObject: function(obj, objName){
            objName = objName || 'Value';

            if (!(typeof obj === 'object' && obj)) {
                throw new Error(objName + ' is not an object');
            }
        },
        validateIfArray: function(arr, arrName){
            arrName = arrName || 'Value';

            if (!(Object.prototype.toString.call(arr) === '[object Array]')) {
                throw new Error(arrName + ' is not an array');
            }
        },
        validateIfTrack: function(track, trackName){
            trackName = trackName || 'Value';

            validator.validateIfObject(track, trackName);
            if (!(track.hasOwnProperty('_id') ||
                        track.hasOwnProperty('_name') ||
                        track.hasOwnProperty('_url'))
            ) {
                throw new Error(trackName + ' is not a valid track object');
            }
        },
        validateName: function(name, nameName){
            nameName = nameName || 'Value';

            validator.validateIfUndefined(name, nameName);
            validator.validateIfString(name, nameName);
        },
        validateGenres: function(genres, genresName){
            genresName = genresName || 'Value';

            validator.validateIfUndefined(genres, genresName);
            validator.validateIfArray(genres, genresName);
            for (var index in genres) {
                if (!validator.validateIfString(genres[index])) {
                    throw new Error(genresName + ' contains a non-string element at index ' + index);
                }
            }
        },
        validateTracks: function(tracks, tracksName){
            tracksName = tracksName || 'Value';

            validator.validateIfUndefined(tracks, tracksName);
            validator.validateIfArray(tracks, tracksName);
            for (var index in tracks) {
                if (!validator.validateIfTrack(tracks[index])) {
                    throw new Error(tracksName + ' contains a non-track element at index ' + index);
                }
            }
        }
    };

    var playlistObject = {
        init: function(name, genres, tracks) {
            this._id = previousID++;
            this.name = name;
            this.genres = genres;
            this.tracksList = tracks;

            return this;
        },
        get id(){
            return this._id;
        },
        get name(){
            return this._name;
        },
        set name(value){
            validator.validateName(value, 'Playlist name');

            this._name = value;
        },
        get genres(){
            return this._genres;
        },
        set genres(value){
            validator.validateGenres(value, 'Playlist genres');

            this._genres = value;
        },
        get tracksList(){
            return this._tracksList;
        },
        set tracksList(value){
            validator.validateTracks(value, 'Playlist tracks');

            this._tracksList = value;
        },
        get trackRequests(){
            return this._trackRequests;
        },
        set trackRequests(value){
            validator.validateTracks(value, 'Track requests list');

            this._trackRequests = value;
        },
        addNewTrack: function(track){
            validator.validateIfUndefined(track, 'Track to be added');
            validator.validateIfTrack(track, 'Track to be added');

            this.tracks.push(track);

            return this;
        },
        removeTrack: function(track){
            var trackExists = this.tracks.some(function(tr){
                return tr.id === track.id;
            });

            validator.validateIfUndefined(track, 'Track to be removed');
            validator.validateIfTrack(track, 'Track to be removed');

            if (trackExists) {
                this.tracks.splice(this.tracks.indexOf(track, 1));
            }

            return this;
        }
    };

    return playlistObject;
}());