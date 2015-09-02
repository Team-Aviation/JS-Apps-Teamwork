 import 'jquery';
 import 'bootstrapjs';
 import Handlebars from 'handlebars';
 import { validator } from 'scripts/validator.js';
 import { track } from 'scripts/track.js';
 import { playlist } from 'scripts/playlist.js';
 import { playlistCollection } from 'scripts/playlistCollection.js';
 import { user } from 'scripts/user.js';

var appInitialize = (function() {
	// Checking if the module is sucsessfully loaded
    console.log('App loaded sucsessfully!');

    window.sammyApp = Sammy('#container', function () {

        this.get('#/', function () {
            var $container = $('#container');

            templates.get('SearchFormTemplate')
            .then(function (template) {
                $container.html(template());

                // add functionality of search
            });
        });

        this.get('#/searchresult', function () {
          var $container = $('#container');

          templates.get('SearchResultsTemplate')
          .then(function (template) {
              $container.html(template());
              
              SC.get('/tracks', { q: 'metal' }, function(tracks) {
                  console.log(tracks);
              });
            });
        });

        this.get('#/login', function () {

            var $container = $('#container');

            templates.get('LoginTemplate')
            .then(function (template) {
                $container.html(template());
                System.import('scripts/login.js');

                // add functionality of search
            });


        })
    });

    $(function () {
        sammyApp.run('#/');
    })

    // initialize SoundCloud client with app credentials
    SC.initialize({
        client_id: '4127f69cc3dee436fd07b81977a1dfc5',
        redirect_uri: 'http://localhost/callback.html'
    });

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
