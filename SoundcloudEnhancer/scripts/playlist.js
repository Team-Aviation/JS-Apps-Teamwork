var playlist = (function(){
    var validator = require('./validator')();
    var previousID = 1;

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