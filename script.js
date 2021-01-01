$(document).ready(function() {
    // Retreiving items from local storage and assigning it to a variable poseArray
    var poseArray = JSON.parse(localStorage.getItem("savedPoses"));
    if (poseArray === null) {
        poseArray = [];
    }

    displayStoredposes();

    // NEEDED FOR BURGER MENU TO OPERATE.  Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });


    var youTubeAPI = "AIzaSyAvSFR7-A7Kzgdxke72C_81WGWueciQj-8"

    var youTubeAPI2 = 'AIzaSyB3X71cc_7KgW_lj5Djfybf7PiGT0-LGAw'

    var youTubeAPITera = 'AIzaSyDkn-xiKVHlJxh8LyojlnPzgwutJlly5yY'

    function findYogaVideo(userVideoSearch) {
        $(".posePlaceholder").empty();
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + userVideoSearch + " yoga" + "&key=" + youTubeAPITera,
            //add iframe to capture API feed of pose video from youtube
            success: function(result) {
                var poseId = result.items[0].id.videoId;
                console.log(result)
                    //create iframe el and append variable to grab data and append to my studio dom
                var iframeEl = $("<iframe>").attr("src", "https://www.youtube.com/embed/" + poseId).addClass("videoiFrame")
                $(".posePlaceholder").prepend(iframeEl)
            }
        });
    }

    //button for yoga pose api data search
    $(".btn-poses").on("click", function() {
        var userSearch = $("#userSearch").val();
        findYogaVideo(userSearch)
        savePosesToArray(userSearch);
        generateButtons(poseArray);
        // Clearing the input field so it is ready for the next search
        $("#userSearch").val("");
    })

    //Saves user searched poses for future use when clicked
    $(".userFav").on("click", function() {
        var userFavorites = $(this).text();
        findYogaVideo(userFavorites)
        console.log($(this).text());
    })

    function savePosesToArray(userSearch) {
        console.log("savePosesToArray")
        if (poseArray.includes(userSearch)) {
            // DO WE WANT THIS TO REMAIN AS ONLY CONSOLE LOGGING OR DO WE WANT IT SHOWN TO THE USER?
            console.log("Pose name already selected");
            return;
        } else {
            poseArray.push(userSearch);
            storedPoses();
        };
    };

    function storedPoses() {
        localStorage.setItem("savedPoses", JSON.stringify(poseArray));
    };

    function displayStoredposes() {
        if (poseArray != []) {
            generateButtons(poseArray);
        };
    };

    function generateButtons(posesArray) {

        var btnGroup = $(".buttons");
        btnGroup.empty();

        posesArray.forEach((element) => {
            var poseBtn = $("<button type='button' class='button is-warning is-light userFav'>");
            poseBtn.text(element);
            btnGroup.prepend(poseBtn);
            console.log(btnGroup)
        });

        $('.userPoses').html(btnGroup)
    };


    var yelpLocationAPI = "BXl-oGLTGuQQ1mZjGZ3mGnAMpz8-Xp_I0dASCnxX0t9wFJNCFyh_M1Gsad-kQT7kXHOomdEt5u3nBTS4lcW7FdaTiqaPw--075rZ9jMLYX_QyVmv18DsYy4CdgncX3Yx"

    function findStudioNearYou(location) {
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Yoga Studio&location=' + location + '&sort_by=distance',
            headers: {
                "Authorization": "Bearer BXl-oGLTGuQQ1mZjGZ3mGnAMpz8-Xp_I0dASCnxX0t9wFJNCFyh_M1Gsad-kQT7kXHOomdEt5u3nBTS4lcW7FdaTiqaPw--075rZ9jMLYX_QyVmv18DsYy4CdgncX3Yx"
            },

            success: function(result) {
                console.log(result)
                var yogaBusiness = result.businesses[0].name
                var yogaBusPhone = result.businesses[0].display_phone
                var yogaBusAddress = result.businesses[0].location.display_address[0] + "<br>" + result.businesses[0].location.display_address[1]
                $(".zipPlaceholder").removeClass("is-hidden");
                $(".businessName").html(yogaBusiness);
                $(".phonenumber").html(yogaBusPhone);
                $(".address").html(yogaBusAddress);
            }
        });
    }

    //button for yoga studio location search w/ zippcode
    $(".btn-zip").on("click", function() {
        var zipSearch = $("#zipSearch").val();
        $(".zipPlaceholder").addClass("is-hidden");
        findStudioNearYou(zipSearch);
        // Clearing the input field so it is ready for the next search
        $("#zipSearch").val("");
    })
})