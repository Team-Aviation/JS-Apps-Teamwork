 // import { Track } from 'scripts/track.js';
 // import { Playlist } from 'scripts/playlist.js';
 import 'jquery';
 import 'bootstrapjs';
 import { validator } from 'scripts/validator.js';
 import { track } from 'scripts/track.js';
 import { playlist } from 'scripts/playlist.js';
 import { playlistCollection } from 'scripts/playlistCollection.js';
 import { user } from 'scripts/user.js';

var appInitialize = (function() {
	// Checking if the module is sucsessfully loaded
	console.log('App loaded sucsessfully!');

	var imageUrlArray = Array.apply(null, Array(32))
		.map(function(){
			return './img/pic385x385.png';
		});

	var imageUrlContainerObject = {urls: imageUrlArray};
	var backgroundImageContainer = $('#backgroundContainer');
    var backgroundImageTemplate = Handlebars.compile(($('#backgroundImageTemplate')).html());

    backgroundImageContainer.html(backgroundImageTemplate(imageUrlContainerObject));

}());

export {appInitialize};