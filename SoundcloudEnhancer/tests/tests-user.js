import {user} from '../scripts/user.js';
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
                var userObject = Object.create(user);
                userObject.init(undefined, []);
            }

            expect(test).to.throw();
        });
        it('expect to throw when username is not a string', function () {
            function test() {
                var userObject = Object.create(user);
                userObject.init(0, []);
            }

            expect(test).to.throw();
        });
        it('expect to throw when username is an empty string', function () {
            function test() {
                var userObject = Object.create(user);
                userObject.init('', []);
            }

            expect(test).to.throw();
        });
        it('expect not to throw when username is valid', function () {
            function test() {
                var userObject = Object.create(user);
                userObject.init(getValidUsername(), []);
            }

            expect(test).not.to.throw();
        });
    });
});


var validUsernames = [
    'John',
    'Peter',
    'willIAm',
    'mashinata'
];

function getValidUsername() {
    return validUsernames[(Math.random() * validUsernames.length) | 0];
}