 import 'jquery';
 import 'bootstrapjs';
 import Handlebars from 'handlebars';
 import { validator } from './validator.js';
 import { track } from './track.js';
 import { playlist } from './playlist.js';
 import { playlistCollection } from './playlistCollection.js';
 import { user } from './user.js';

var appInitialize = (function() {
	// Checking if the module is sucsessfully loaded
	console.log('App loaded sucsessfully!');

	// The below should be replaced by loading an array of the image urls of the last 30 playlists added to the system.
	var imageUrlArray = Array.apply(null, Array(30))
		.map(function(){
			return './img/pic385x385.png';
		});
	var imageUrlContainerObject = {urls: imageUrlArray};
	var backgroundImageContainer = $('#backgroundContainer');
    var imageTemplate = Handlebars.compile(($('#imageTemplate')).html());
    backgroundImageContainer.html(imageTemplate(imageUrlContainerObject));

	var searchForPlaylists = function() {
		// This searches the playlist for result according to the words in the input field
		//
		// var allPlaylists = .... load all playlist from db;
		// var searchedPatternsString = $('#playlystSearcher').val();
		// var searchedPatternsArra = searchedPatternsString.trim().split(" ");
		// var searchResults = allPlaylists.searchForPlaylists(searchedPatternsArra);

		$('#backgroundContainer').css('display', 'none');

		var resultImageUrlArray = Array.apply(null, Array(30))
		.map(function(){
			return './img/redPic350x350.png';
		});
		var resultImageUrlContainerObject = {urls: resultImageUrlArray};
		var resultImageContainer = $('#innerContent');
		// resultImageContainer.css('height', '80%');
		resultImageContainer.removeClass('cover');
		resultImageContainer.addClass('searchResultsContainer');
		resultImageContainer.html(imageTemplate(resultImageUrlContainerObject));
	};

    $('#searchPlaylistBtn').click(searchForPlaylists);


}());

export {appInitialize};
