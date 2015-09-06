import {playlist} from '../SoundcloudEnhancer/scripts/playlist.js';
var expect = require('chai').expect;

describe('Test for playlist object', function () {
    describe('Existence checks', function () {
        it('expect playlist to be an object', function () {
            expect(playlist).to.be.an('object');
        });
        it('expect playlist.init to be a function', function () {
            expect(playlist.init).to.be.a('function');
        });
    });

    describe('Name validation checks', function () {
        it('expect to throw when name is not a string', function () {
            function test() {
                var playlistObject = Object.create(playlist),
                    name = 0,
                    imageUrl = getValidImageUrl(),
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = validTracksList;

                playlistObject.init(name, imageUrl, genres, tracks);
            }

            expect(test).to.throw();
        });
        it('expect to throw when name is an empty string', function () {
            function test() {
                var playlistObject = Object.create(playlist),
                    name = '',
                    imageUrl = getValidImageUrl(),
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = validTracksList;
                playlistObject.init(name, imageUrl, genres, tracks);
            }

            expect(test).to.throw();
        });
        it('expect not to throw when all parameters are valid', function () {
            function test() {
                var playlistObject = Object.create(playlist),
                    name = getValidName(),
                    imageUrl = getValidImageUrl(),
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = validTracksList;

                playlistObject.init(name, imageUrl, genres, tracks);
            }

            expect(test).not.to.throw();
        });
    });

    describe('Image validation checks', function () {
        it('expect to throw when image is not a string', function () {
            function test() {
                var playlistObject = Object.create(playlist),
                    name = getValidName(),
                    imageUrl = 0,
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = validTracksList;

                playlistObject.init(name, imageUrl, genres, tracks);
            }

            expect(test).to.throw();
        });
        it('expect to throw when image is an empty string', function () {
            function test() {
                var playlistObject = Object.create(playlist),
                    name = getValidName(),
                    imageUrl = '',
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = validTracksList;

                playlistObject.init(name, imageUrl, genres, tracks);
            }

            expect(test).to.throw();
        });
        it('expect to throw when image has invalid url', function () {
            function test() {
                var playlistObject = Object.create(playlist),
                    name = getValidName(),
                    imageUrl = 'htt:/*!invalid..',
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = validTracksList;

                playlistObject.init(name, imageUrl, genres, tracks);
            }

            expect(test).to.throw();
        });
    });

    //describe('Genres validation checks', function () {
    //    it('expect to throw when genres is not an array', function () {
    //        function test() {
    //            var playlistObject = Object.create(playlist),
    //                name = getValidName(),
    //                imageUrl = getValidImageUrl(),
    //                genres = 0,
    //                tracks = validTracksList;
    //            playlistObject.init(name, imageUrl, genres, tracks);
    //        }
    //
    //        expect(test).to.throw();
    //    });
    //});

    //describe('TracksList validation checks', function () {
    //    it('expect to throw when tracksList is not an array', function () {
    //        function test() {
    //            var playlistObject = Object.create(playlist),
    //                name = getValidName(),
    //                imageUrl = getValidImageUrl(),
    //                genres = [getValidGenre(), getValidGenre()],
    //                tracks = 0;
    //            playlistObject.init(name, imageUrl, genres, tracks);
    //        }
    //
    //        expect(test).to.throw();
    //    });
    //    it('expect to throw when tracksList is an empty array', function () {
    //        function test() {
    //            var playlistObject = Object.create(playlist),
    //                name = getValidName(),
    //                imageUrl = getValidImageUrl(),
    //                genres = [getValidGenre(), getValidGenre()],
    //                tracks = [];
    //            playlistObject.init(name, imageUrl, genres, tracks);
    //        }
    //
    //        expect(test).to.throw();
    //    });
    //});

    describe('addNewTrack checks', function () {
        it('expect to throw if track to add is undefined', function () {
            function test() {
                var playlistObject = Object.create(playlist),
                    name = getValidName(),
                    imageUrl = getValidImageUrl(),
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = [],
                    trackToAdd = undefined;

                playlistObject.init(name, imageUrl, genres, tracks).addNewTrack(trackToAdd);
            }

            expect(test).to.throw();
        });
        it('expect to throw if track to add is invalid track', function () {
            function test() {
                var playlistObject = Object.create(playlist),
                    name = getValidName(),
                    imageUrl = getValidImageUrl(),
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = [],
                    trackToAdd = {_name: 'track'};

                playlistObject.init(name, imageUrl, genres, tracks).addNewTrack(trackToAdd);
            }

            expect(test).to.throw();
        });
        it('expect to add if track is valid', function () {
                var playlistObject = Object.create(playlist),
                    name = getValidName(),
                    imageUrl = getValidImageUrl(),
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = [],
                    trackToAdd = validTrack;

                playlistObject.init(name, imageUrl, genres, tracks).addNewTrack(trackToAdd);

            expect(playlistObject.tracksList.length).to.equal(1);
        });
    });

    describe('removeTrack checks', function () {
        it('expect to throw if track to remove is undefined', function () {
            function test() {
                var playlistObject = Object.create(playlist),
                    name = getValidName(),
                    imageUrl = getValidImageUrl(),
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = [],
                    trackToRemove = undefined;

                playlistObject.init(name, imageUrl, genres, tracks).removeTrack(trackToRemove);
            }

            expect(test).to.throw();
        });
        it('expect to throw if track to remove is invalid track', function () {
            function test() {
                var playlistObject = Object.create(playlist),
                    name = getValidName(),
                    imageUrl = getValidImageUrl(),
                    genres = [getValidGenre(), getValidGenre()],
                    tracks = [],
                    trackToRemove = {_name: 'track'};

                playlistObject.init(name, imageUrl, genres, tracks).removeTrack(trackToRemove);
            }

            expect(test).to.throw();
        });
        it('expect to remove if track is valid', function () {
            var playlistObject = Object.create(playlist),
                name = getValidName(),
                imageUrl = getValidImageUrl(),
                genres = [getValidGenre(), getValidGenre()],
                tracks = validTracksList,
                trackToRemove = validTrack;

            playlistObject.init(name, imageUrl, genres, tracks).removeTrack(trackToRemove);

            expect(playlistObject.tracksList.length).to.equal(1);
        });
    });
});

var validNames = [
    'favourites',
    'rock-music',
    'BestSongs'
];

function getValidName() {
    return validNames[(Math.random() * validNames.length) | 0];
}

var validImageUrls = [
    'https://i1.sndcdn.com/avatars-000060884982-v725yi-t500x500.jpg',
    'https://i1.sndcdn.com/artworks-000080137941-28rs77-t500x500.jpg',
    'https://i1.sndcdn.com/artworks-000101833119-e6q6sw-t500x500.jpg'
];

function getValidImageUrl() {
    return validImageUrls[(Math.random() * validImageUrls.length) | 0];
}

var validGenres = [
    'techno',
    'house',
    'rock'
];

function getValidGenre() {
    return validGenres[(Math.random() * validGenres.length) | 0];
}

var validTracksList = [
    {
        _id: 1,
        _name: 'Hit Em Up - 2Pac - 320 Lyrics',
        _url: 'https://soundcloud.com/yanni-m-p/hit-em-up-2pac-320-lyrics'
    },
    {
        _id: 2,
        _name: 'Modjo - Chillin\' Ft. Run DMC (Greco Remix) [Free Download]',
        _url: 'https://soundcloud.com/grecoshouse/modjo-chillin-ft-run-dmc-greco-remix'
    }
];

var validTrack = {
    _id: 1,
    _name: 'Hit Em Up - 2Pac - 320 Lyrics',
    _url: 'https://soundcloud.com/yanni-m-p/hit-em-up-2pac-320-lyrics'
};
