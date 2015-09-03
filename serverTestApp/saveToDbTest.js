import {
    track
}
from '../SoundcloudEnhancer/scripts/track.js';
import {
    playlist
}
from '../SoundcloudEnhancer/scripts/playlistChanged.js';
import {
    playlistsSet
}
from '../SoundcloudEnhancer/scripts/playlistsSetChanged.js';
import {
    user
}
from '../SoundcloudEnhancer/scripts/user.js';

var saveToDbTest = (function() {
    var saveToDb = function() {

        var trackInstance = Object.create(track).init('Metallica-Unforgiven', 'metallicaURL');
        var playlistInstance = Object.create(playlist).init('Metallica-PLS', 'metallicaImageURL', ['rock', 'trash'], [trackInstance]);
        var playlistsSetInstance = Object.create(playlistsSet).init([playlistInstance]);
        var userInstance = Object.create(playlist).init('Blqblq', playlistsSetInstance);

        console.log(userInstance);

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/users',
            data: JSON.stringify(userInstance),
            contentType: 'application/json',
            success: function(user) {
                window.alert('Added to the DB!');
            },
            error: function() {
                window.alert('Failed to save data on server!');
            }
        });
    };

    $('#saveBtn').on('click', saveToDb);
}());

 export {
     saveToDbTest
 };