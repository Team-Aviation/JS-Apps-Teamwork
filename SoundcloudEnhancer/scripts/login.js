// initiate auth popup
$("#connectButton").on("click", function () {
  SC.connect(function () {
    location.hash = "/"

    SC.get('/me', function (me) {
        alert('Hello, ' + me.username);
    });

  });
});
