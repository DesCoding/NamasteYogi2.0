var youTubeAPI = "AIzaSyAvSFR7-A7Kzgdxke72C_81WGWueciQj-8"

function findYogaVideo(userVideoSearch){
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + userVideoSearch + "&key=AIzaSyAvSFR7-A7Kzgdxke72C_81WGWueciQj-8",
//add iframe to capture API feed of pose video from youtube
        success: function(result) {
            var poseId = result.items[0].id.videoId;
            console.log(result)
            //create iframe el and append variable to grab data and append to my studio dom
            var iframeEl = $("<iframe>").attr("src","https://www.youtube.com/embed/" + poseId)
            $(".posePlaceholder").append(iframeEl)
        }
    });
}
// //change this to get search term from user text box
// var userVideoInput = "warrior pose"
// findYogaVideo(userVideoInput);

//button for yoga pose api data search - this is working! :)
$(".btn-primary").on("click", function() {
    var userSearch = $("#userSearch").val();
    findYogaVideo(userSearch)
    })
    

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
        $(".zipPlaceholder").append(location)
        $(".yogaStudio").html(yogaBusiness)

        }
    });
}
//commented these sections out becuase jquery button/logic will overwrite these to make the search dynamic instead of hardcode 
// var zipcode = "01073"
// findStudioNearYou(zipcode);

//button for yoga studio location search w/ zippcode - not working right
$(".btn-zip").on("click", function() {
    var zipSearch = $("#zipSearch").val();
    findStudioNearYou(zipSearch)
    })

