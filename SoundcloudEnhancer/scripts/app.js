 // import 'jquery';
 // import 'bootstrapjs';
 // import Handlebars from 'handlebars';
 import {
     validator
 }
 from './validator.js';
 import {
     track
 }
 from './track.js';
 import {
     playlist
 }
 from './playlist.js';
 import {
     playlistsSet
 }
 from './playlistsSetChanged.js';
 import {
     user
 }
 from './user.js';
 import {
     templates
 }
 from '../templates/templates.js';

 // import { playlistControler } './Controllers/PlayGenreController.js';

 var appInitialize = (function() {
     // Checking if the module is successfully loaded
     console.log('App loaded successfully!');

     if (localStorage.USERNAME_STORAGE_KEY && localStorage.PASS_STORAGE_KEY) {
        $('#log').attr('href', '#/logout');
        $('#log').html('Logout');
     }

     templates.get('BackgrounGridTemplate')
         .then(function(template) {
            var imageUrlArray = [];
            var currentImage;
             
            var i;
            for (i = 1; i< 31; i ++) {
                var number = Math.floor(Math.random() * (30 - 2 + 1)) + 2;
                currentImage = './img/PlaylistsCovers/' + number.toString() + '.jpg';
                imageUrlArray.push(currentImage);
            }
             var imageUrlContainerObject = {
                 urls: imageUrlArray
             };
             var backgroundImageContainer = $('#backgroundContainer');
             backgroundImageContainer.html(template(imageUrlContainerObject));
         });


     // Introduce Sammy:
     window.sammyApp = Sammy('#container', function() {

         this.get('#/', function(context) {
             var $container = $('#container');
             $('#backgroundContainer').css('display', 'block');

             templates.get('SearchFormTemplate')
                 .then(function(template) {
                     $container.html(template());
                     $container.removeClass('searchResultsContainer');
                     $container.addClass('cover');

                     $('#searchPlaylistBtn').on('click', function() {
                         context.redirect('#/searchresult');
                     });
                 });
         });

         this.get('#/searchresult', function() {
             var $container = $('#container');
             $('#backgroundContainer').css('display', 'none');

             templates.get('SearchResultsTemplate')
                 .then(function(template) {

                     // The old style:
                     // var resultImageUrlArray = Array.apply(null, Array(30))
                     //     .map(function() {
                     //         return './img/redPic350x350.png';
                     //     });
                     // var resultImageUrlContainerObject = {
                     //     urls: resultImageUrlArray
                     // };
                     // $container.removeClass('cover');
                     // $container.addClass('searchResultsContainer');
                     // $container.html(template(resultImageUrlContainerObject));

                     $container.html(template());

                     SC.get('/tracks', {
                         q: 'metal'
                     }, function(tracks) {
                         console.log(tracks);
                     });
                 });
         });

        this.get('#/player', function() {
             var $container = $('#container');
             $('#backgroundContainer').css('display', 'none');
             $('#backgroundContainer').css('display', 'block');

             templates.get('PlayerPage')
                 .then(function(template) {
                     $container.html(template());
                 });
         });

         this.get('#/profile:username', function() {
             var $container = $('#container');
             $('#backgroundContainer').css('display', 'none');

             templates.get('ProfilePage')
                 .then(function(template) {
                     // Get user details saved locally
                     //         soundCloud.getUser(username, function(user) {
                     //           var profileTemplate = Handlebars.compile(template);
                     // $container.html(profileTemplate(user));
                     //         });
                 });
         });

         this.get('#/login', function(context) {
             var $container = $('#container');
             $('#backgroundContainer').css('display', 'none');

             // Displlay login page
             templates.get('LoginTemplateNew')
                 .then(function(template) {
                     $container.html(template);
                     // System.import('scripts/login.js');
                     $('#loginBtn').on('click', function() {
                        var user = {
                            username: $('#userName').val(),
                            password: $('#userPassword').val()
                        };
                        $.ajax({
                            method: 'POST',
                            url: 'http://localhost:3000/users',
                            data: JSON.stringify(user),
                            contentType: 'application/json',
                            success: function() {
                                window.alert('Loged in!');
                                localStorage.setItem('USERNAME_STORAGE_KEY', user.username);
                                localStorage.setItem('PASS_STORAGE_KEY', user.password);
                                $('#log').attr('href', '#/logout');
                                $('#log').html('Logout');
                                context.redirect('#/');
                            },
                            error: function() {
                                window.alert('Failed to log user!');
                            }
                        });
                     });
                 });             
         });

         this.get('#/logout', function(context) {
            var $container = $('#container');

            localStorage.removeItem('PASS_STORAGE_KEY');
            localStorage.removeItem('USERNAME_STORAGE_KEY');

            $('#log').attr('href', '#/login');
            $('#log').html('Login');
            context.redirect('#/');
         });
     });

     $(function() {
         sammyApp.run('#/');

     });

     // initialize SoundCloud client with app credentials
     SC.initialize({
         client_id: '4127f69cc3dee436fd07b81977a1dfc5',
         redirect_uri: 'http://localhost/callback.html'
     });
 }());

 export {
     appInitialize
 };
