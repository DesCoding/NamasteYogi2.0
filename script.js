var youTubeAPI = "AIzaSyAvSFR7-A7Kzgdxke72C_81WGWueciQj-8"
// CHANGES
var yelpLocationAPI = "BXl-oGLTGuQQ1mZjGZ3mGnAMpz8-Xp_I0dASCnxX0t9wFJNCFyh_M1Gsad-kQT7kXHOomdEt5u3nBTS4lcW7FdaTiqaPw--075rZ9jMLYX_QyVmv18DsYy4CdgncX3Yx"

function findStudioNearYou(location){
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + 'Yoga Studio' + '&location=' + location,
        headers: {
            "Authorization": "Bearer BXl-oGLTGuQQ1mZjGZ3mGnAMpz8-Xp_I0dASCnxX0t9wFJNCFyh_M1Gsad-kQT7kXHOomdEt5u3nBTS4lcW7FdaTiqaPw--075rZ9jMLYX_QyVmv18DsYy4CdgncX3Yx"
        },
        success: function(result) {
            console.log(result)
        var yogaBusiness = result.businesses[0].name
        $(".yogaStudio").html(yogaBusiness)

        }
    });
}
//change this to get zipcode from user input. 
var zipcode = "01073"
findStudioNearYou(zipcode);

function findYogaVideo(userVideoSearch){
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + userVideoSearch + "&key=AIzaSyAvSFR7-A7Kzgdxke72C_81WGWueciQj-8",

        success: function(result) {
            console.log(result)
        }
    });
}
//change this to get search term from user text box
var userVideoInput = "childs"
findYogaVideo(userVideoInput);



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
            // $.ajax({
            //     url: queryURL,
            //     method: "GET"
            //     //.then promises to retun the function (in this API) and captures the response
            //    }).then(function (response) {
            //        console.log("response: ", response);
           
            //        //displayFiveDayForecast(response);
            //        for (var i = 3; i < response.list.length; i = i+8){
            //        displayFiveDayForecast(response.list[i], response.list[i].dt_txt)
            //        }
            //    });