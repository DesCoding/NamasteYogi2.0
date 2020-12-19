var youTubeAPI = "AIzaSyAvSFR7-A7Kzgdxke72C_81WGWueciQj-8"
// CHANGES
var yelpLocationAPI = "BXl-oGLTGuQQ1mZjGZ3mGnAMpz8-Xp_I0dASCnxX0t9wFJNCFyh_M1Gsad-kQT7kXHOomdEt5u3nBTS4lcW7FdaTiqaPw--075rZ9jMLYX_QyVmv18DsYy4CdgncX3Yx"

$.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + 'Yoga Studio' + '&location=63117',
    headers: {
        "Authorization": "Bearer BXl-oGLTGuQQ1mZjGZ3mGnAMpz8-Xp_I0dASCnxX0t9wFJNCFyh_M1Gsad-kQT7kXHOomdEt5u3nBTS4lcW7FdaTiqaPw--075rZ9jMLYX_QyVmv18DsYy4CdgncX3Yx"
    },
    success: function(result) {
        console.log(result)
    }
});

$.ajax({
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + 'userInput' + "&key=AIzaSyAvSFR7-A7Kzgdxke72C_81WGWueciQj-8",

    success: function(result) {
        console.log(result)
    }
});



           //     / Event listener for btn-primary
            //     $(".btn-primary").on("click", function() {
            //     // Assigning a variable for userSearch
            //     var userSearch = $("#userSearch").val();
            //     // Constructing a URL to search Open Weather Map API for the City,State
            //     var cityAPISearch = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + ",US&appid=ae3e2e9bcf9bf274f436653d07f65b1c";
            //     // Performing our AJAX GET request
            //     $.ajax({
            //             url: cityAPISearch,
            //             method: "GET"
            //         })
            //         // After the data comes back from the API
            //         .then(function(response) {
            //             // Storing an array of results in the results variable
            //             var results = [userSearch, response.coord.lat, response.coord.lon];
            //             console.log(results);
            //         });
            // });