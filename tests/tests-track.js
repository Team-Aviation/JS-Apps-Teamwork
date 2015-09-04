import {track} from '../SoundcloudEnhancer/scripts/track.js';
var expect = require('chai').expect;

describe('Test for track object', function () {
    describe('Existence checks', function () {
        it('expect track to be an object', function () {
            expect(track).to.be.an('object');
        });
        it('expect track.init to be a function', function () {
            expect(track.init).to.be.a('function');
        });
    });

    describe('Name validation checks', function () {
        it('expect to throw when name is not a string', function () {
            function test() {
                var trackObject = Object.create(track),
                    name = 0,
                    url = getValidUrl();

                trackObject.init(name, url);
            }

            expect(test).to.throw();
        });
        it('expect to throw when name is an empty string', function () {
            function test() {
                var trackObject = Object.create(track),
                    name = '',
                    url = getValidUrl();

                trackObject.init(name, url);
            }

            expect(test).to.throw();
        });
        it('expect not to throw when all parameters are valid', function () {
            function test() {
                var trackObject = Object.create(track),
                    name = getValidName(),
                    url = getValidUrl();

                trackObject.init(name, url);
            }

            expect(test).not.to.throw();
        });
    });

    describe('URL validation checks', function () {
        it('expect to throw when URL is not a string', function () {
            function test() {
                var trackObject = Object.create(track),
                    name = getValidName(),
                    url = 0;

                trackObject.init(name, url);
            }

            expect(test).to.throw();
        });
        it('expect to throw when URL is an empty string', function () {
            function test() {
                var trackObject = Object.create(track),
                    name = getValidName(),
                    url = '';

                trackObject.init(name, url);
            }

            expect(test).to.throw();
        });
        it('expect to throw when URL is invalid', function () {
            function test() {
                var trackObject = Object.create(track),
                    name = getValidName(),
                    url = 'p:/not valid../';

                trackObject.init(name, url);
            }

            expect(test).to.throw();
        });
    });
});

var validNames = [
    'Hit Em Up - 2Pac - 320 Lyrics',
    'Modjo - Chillin\' Ft. Run DMC (Greco Remix) [Free Download]',
    'Placebo - The Bitter End'
];

function getValidName() {
    return validNames[(Math.random() * validNames.length) | 0];
}

var validUrls = [
    'https://soundcloud.com/yanni-m-p/hit-em-up-2pac-320-lyrics',
    'https://soundcloud.com/grecoshouse/modjo-chillin-ft-run-dmc-greco-remix',
    'https://soundcloud.com/placeboworld/placebo-the-bitter-end'
];

function getValidUrl() {
    return validUrls[(Math.random() * validUrls.length) | 0];
}
