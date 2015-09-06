import {playlistsSet} from '../SoundcloudEnhancer/scripts/playlistsSet.js';
var expect = require('chai').expect;

describe('Test for playlistsSet object', function () {
    describe('Existence checks', function () {
        it('expect playlistsSet to be an object', function () {
            expect(playlistsSet).to.be.an('object');
        });
        it('expect playlistsSet.init to be a function', function () {
            expect(playlistsSet.init).to.be.a('function');
        });
    });

    describe('Playlists checks', function () {
        it('expect playlists to throw if not an array', function () {
            function test() {
                var playlistsSetObject = Object.create(playlistsSet),
                    playlists = 0;

                playlistsSetObject.init(playlists);
            }

            expect(test).to.throw();
        });
        it('expect playlists not to throw if valid', function () {
            function test() {
                var playlistsSetObject = Object.create(playlistsSet),
                    playlists = validPlaylistsList;

                playlistsSetObject.init(playlists);
            }

            expect(test).not.to.throw();
        });
        it('expect to have playlists when passed in constructor', function () {
            var playlistsSetObject = Object.create(playlistsSet),
                playlists = validPlaylistsList;

            playlistsSetObject.init(playlists);

            expect(playlistsSetObject.playlistsList.length).to.equal(2);
        });
    });

    describe('addNewPlaylist checks', function () {
        it('expect to throw if playlist to add is undefined', function () {
            function test() {
                var playlistsSetObject = Object.create(playlistsSet),
                    playlists = [],
                    playlistToAdd = undefined;

                playlistsSetObject.init(playlists);
                playlistsSetObject.addNewPlaylist(playlistToAdd);
            }

            expect(test).to.throw();
        });
        it('expect to throw if playlist to add is not a valid playlist', function () {
            function test() {
                var playlistsSetObject = Object.create(playlistsSet),
                    playlists = [],
                    playlistToAdd = 0;

                playlistsSetObject.init(playlists);
                playlistsSetObject.addNewPlaylist(playlistToAdd);
            }

            expect(test).to.throw();
        });
        it('expect to add valid playlist', function () {
                var playlistsSetObject = Object.create(playlistsSet),
                    playlists = [],
                    playlistToAdd = validPlaylist;

                playlistsSetObject.init(playlists);
                playlistsSetObject.addNewPlaylist(playlistToAdd);

            expect(playlistsSetObject.playlistsList.length).to.equal(1);
        });
    });

    describe('removePlaylist checks', function () {
        it('expect to throw if playlist to remove is undefined', function () {
            function test() {
                var playlistsSetObject = Object.create(playlistsSet),
                    playlists = validPlaylistsList,
                    playlistToRemove = undefined;

                playlistsSetObject.init(playlists);
                playlistsSetObject.removePlaylist(playlistToRemove);
            }

            expect(test).to.throw();
        });
        it('expect to throw if playlist to remove is not a valid playlist', function () {
            function test() {
                var playlistsSetObject = Object.create(playlistsSet),
                    playlists = validPlaylistsList,
                    playlistToRemove = 0;

                playlistsSetObject.init(playlists);
                playlistsSetObject.removePlaylist(playlistToRemove);
            }

            expect(test).to.throw();
        });
        it('expect to remove valid playlist', function () {
            var playlistsSetObject = Object.create(playlistsSet),
                playlists = validPlaylistsList,
                playlistToRemove = validPlaylist;

            playlistsSetObject.init(playlists);
            playlistsSetObject.removePlaylist(playlistToRemove);

            expect(playlistsSetObject.playlistsList.length).to.equal(1);
        });
    });

    describe('searchPlaylists checks', function () {
        it('expect to throw if search patterns contain undefined', function () {
            function test() {
                var playlistsSetObject = Object.create(playlistsSet),
                    playlists = validPlaylistsList,
                    patterns = ['favourites', undefined];

                playlistsSetObject.init(playlists);
                playlistsSetObject.searchPlaylists(patterns);
            }

            expect(test).to.throw();
        });
        it('expect to throw if search patterns is not an array', function () {
            function test() {
                var playlistsSetObject = Object.create(playlistsSet),
                    playlists = validPlaylistsList,
                    patterns = 0;

                playlistsSetObject.init(playlists);
                playlistsSetObject.searchPlaylists(patterns);
            }

            expect(test).to.throw();
        });
        it('expect to throw if search patterns contain non-string pattern', function () {
            function test() {
                var playlistsSetObject = Object.create(playlistsSet),
                    playlists = validPlaylistsList,
                    patterns = ['favourites', 0];

                playlistsSetObject.init(playlists);
                playlistsSetObject.searchPlaylists(patterns);
            }

            expect(test).to.throw();
        });
        //it('expect to not find any playlist if patterns are not found', function () {
        //    var playlistsSetObject = Object.create(playlistsSet),
        //        playlists = validPlaylistsList,
        //        patterns = ['favourites', 'this-is-not-a-playlist-name'];
        //
        //    playlistsSetObject.init(playlists);
        //
        //    var foundPlaylists = playlistsSetObject.searchPlaylists(patterns);
        //
        //
        //    expect(foundPlaylists.length).to.equal(0);
        //});
    });
});

var validPlaylistsList = [
    {
        _id: 1,
        _name: 'favourites',
        _genres: ['pop'],
        _tracksList: [
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
        ],
        _trackRequests: [],
        addNewTrack: function () {
        },
        removeTrack: function () {
        }
    },
    {
        _id: 2,
        _name: 'modjo',
        _genres: ['dance', 'pop'],
        _tracksList: [
            {
                _id: 2,
                _name: 'Modjo - Chillin\' Ft. Run DMC (Greco Remix) [Free Download]',
                _url: 'https://soundcloud.com/grecoshouse/modjo-chillin-ft-run-dmc-greco-remix'
            }
        ],
        _trackRequests: [],
        addNewTrack: function () {
        },
        removeTrack: function () {
        }
    }
];

var validPlaylist = {
    _id: 2,
    _name: 'modjo',
    _genres: ['dance', 'pop'],
    _tracksList: [
        {
            _id: 2,
            _name: 'Modjo - Chillin\' Ft. Run DMC (Greco Remix) [Free Download]',
            _url: 'https://soundcloud.com/grecoshouse/modjo-chillin-ft-run-dmc-greco-remix'
        }
    ],
    _trackRequests: [],
    addNewTrack: function () {
    },
    removeTrack: function () {
    }
};