import {user} from '../SoundcloudEnhancer/scripts/user.js';
var expect = require('chai').expect;

describe('Test for user object', function () {
    describe('Existence checks', function () {
        it('expect user to be an object', function () {
            expect(user).to.be.an('object');
        });
        it('expect user.init to be a function', function () {
            expect(user.init).to.be.a('function');
        });
    });

    describe('Username validation checks', function () {
        it('expect to throw when username is undefined', function () {
            function test() {
                var userObject = Object.create(user),
                    username = undefined,
                    playlists = validPlaylistsList;

                userObject.init(undefined, []);
            }

            expect(test).to.throw();
        });
        it('expect to throw when username is not a string', function () {
            function test() {
                var userObject = Object.create(user),
                    username = 0,
                    playlists = validPlaylistsList;

                userObject.init(username, playlists);
            }

            expect(test).to.throw();
        });
        it('expect to throw when username is an empty string', function () {
            function test() {
                var userObject = Object.create(user),
                    username = '',
                    playlists = validPlaylistsList;

                userObject.init(username, playlists);
            }

            expect(test).to.throw();
        });
        it('expect to throw when username is too short', function () {
            function test() {
                var userObject = Object.create(user),
                    username = 'a',
                    playlists = validPlaylistsList;

                userObject.init(username, playlists);
            }

            expect(test).to.throw();
        });
        it('expect to throw when username is too long', function () {
            function test() {
                var userObject = Object.create(user),
                    username = '1234567890',
                    playlists = validPlaylistsList;

                userObject.init(username, playlists);
            }

            expect(test).to.throw();
        });
        it('expect not to throw when username is valid', function () {
            function test() {
                var userObject = Object.create(user),
                    username = getValidUsername(),
                    playlists = validPlaylistsList;

                userObject.init(username, playlists);
            }

            expect(test).not.to.throw();
        });
    });
});

var validUsernames = [
    'John',
    'Peter',
    'willIAm',
    'mashinata',
    '15897646'
];

function getValidUsername() {
    return validUsernames[(Math.random() * validUsernames.length) | 0];
}

var validPlaylistsList = {
    _playlists: [
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
    ],
    searchPlaylists: function () {
    },
    addNewPlaylist: function () {
    },
    removePlaylist: function () {
    }
};