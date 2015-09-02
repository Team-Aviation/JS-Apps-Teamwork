 // import 'jquery';
 // import 'bootstrapjs';
 // import Handlebars from 'handlebars';
 import { validator } from './validator.js';
 import { track } from './track.js';
 import { playlist } from './playlist.js';
 import { playlistCollection } from './playlistCollection.js';
 import { user } from './user.js';
 import {templates} from '../templates/templates.js';

 // import { playlistControler } './Controllers/PlayGenreController.js';

var appInitialize = (function() {
	// Checking if the module is successfully loaded
	console.log('App loaded successfully!');

	templates.get('BackgrounGridTemplate')
        .then(function (template) {
		// The below should be replaced by loading an array of the image urls of the last 30 playlists added to the system.
        	var imageUrlArray = Array.apply(null, Array(30))
				.map(function(){
					return './img/pic385x385.png';
				});
			var imageUrlContainerObject = {urls: imageUrlArray};
			var backgroundImageContainer = $('#backgroundContainer');
		    var imageTemplate = Handlebars.compile(template);
		    backgroundImageContainer.html(imageTemplate(imageUrlContainerObject));
        });
	

	// Introduce Sammy:
	var sammyApp = Sammy('#container', function () {
		var that = this;

        this.get('#/', function (context) {
            var $container = $('#container');
            $('#backgroundContainer').css('display', 'block');

            templates.get('SearchFormTemplate')
	            .then(function (template) {
	                $container.html(template);
	                $container.removeClass('searchResultsContainer');
					$container.addClass('cover');

	                $('#searchPlaylistBtn').on('click', function() {
				    	context.redirect('#/searchresult');
					});
	            });
        });

        this.get('#/searchresult', function () {
        	var $container = $('#container');
        	$('#backgroundContainer').css('display', 'none');

        	templates.get('SearchResults')
        		.then(function (template) {
        			var resultImageUrlArray = Array.apply(null, Array(30))
					.map(function(){
						return './img/redPic350x350.png';
					});
					var resultImageUrlContainerObject = {urls: resultImageUrlArray};
					$container.removeClass('cover');
					$container.addClass('searchResultsContainer');

					var searchResultsTemplate = Handlebars.compile(template);

					$container.html(searchResultsTemplate(resultImageUrlContainerObject));
        		});
        });

        this.get('#/profile:username', function () {
        	var $container = $('#container');
        	$('#backgroundContainer').css('display', 'none');

        	templates.get('ProfilePage')
        		.then(function (template) {
        			// Get user details saved locally
      //   			soundCloud.getUser(username, function(user) {
      //   				var profileTemplate = Handlebars.compile(template);
						// $container.html(profileTemplate(user));
      //   			});
        		});
        });
       	
       	this.get('#/login', function () {
        	var $container = $('#container');
        	$('#backgroundContainer').css('display', 'none');

        	// Displlay login page
        	templates.get('LoginPage')
        		.then(function (template) {
        			$container.html(template);
        		});

        	// After successfully logged:
        	
        	// Save user details and locally and get access key!

        	$('#log').attr('href', '#/logout');
        	$('#log').html('Logout');
        });

        this.get('#/logout', function (context) {
        	var $container = $('#container');

        	// Delete user unfo saved in the local storage

        	$('#log').attr('href', '#/login');
        	$('#log').html('Login');
        	context.redirect('#/');
        });


      //   $('#btn-logout').on('click', function() {
      //   data.users.logout()
      //     .then(function() {
      //       location = '#/';
      //       document.location.reload(true);
      //     });
      // });


   	});

    $(function () {
        sammyApp.run('#/');

    });
}());

export {appInitialize};
