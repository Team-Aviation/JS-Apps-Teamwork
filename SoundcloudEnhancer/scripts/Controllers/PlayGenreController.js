$(document).ready( function () {
    SC.initialize({
        client_id: '0911f74bb28df4d7fe8d49dc8c14b839'

    });
    $('.genre').on('click', function (e) {

        playGenre(e.target.innerHTML);
    });

});

function playGenre(genre) {
    SC.get('/tracks', {genres: genre}, function (tracks) {

        var random = Math.floor(Math.random() * (9 - 0 + 1) + 0);

        SC.oEmbed(tracks[random].uri, {auto_play: true}, document.getElementById('player'));
    })
}
