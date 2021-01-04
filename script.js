$(document).ready(function() {
    // Retreives items from local storage and assigning it to a variable poseArray
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

    // API Keys for youTube - multiple needed due to limit for searches per day
    var youTubeAPI = "AIzaSyAvSFR7-A7Kzgdxke72C_81WGWueciQj-8"

    var youTubeAPI2 = 'AIzaSyB3X71cc_7KgW_lj5Djfybf7PiGT0-LGAw'

    var youTubeAPITera = 'AIzaSyDkn-xiKVHlJxh8LyojlnPzgwutJlly5yY'

    function findYogaVideo(userVideoSearch) {
        $(".posePlaceholder").empty();
        $.ajax({
            url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + userVideoSearch + " yoga" + "&key=" + youTubeAPITera,
            // Add iframe to capture API feed of pose video from youtube
            success: function(result) {
                var poseId = result.items[0].id.videoId;
                console.log(result)
                    // Create iframe el and append variable to grab data and append to my studio dom
                var iframeEl = $("<iframe>").attr("src", "https://www.youtube.com/embed/" + poseId).addClass("videoiFrame")
                $(".posePlaceholder").prepend(iframeEl)
            }
        });
    }

    // Button for yoga pose api data search
    $(".btn-poses").on("click", function() {
        var userSearch = $("#userSearch").val();
        findYogaVideo(userSearch)
        savePosesToArray(userSearch);
        generateButtons(poseArray);
        // Clearing the input field so next searched item will show up
        $("#userSearch").val("");
    })

    // Plays saved user searched poses for future use when clicked
    $(".userFav").on("click", function() {
            var userFavorites = $(this).text();
            findYogaVideo(userFavorites)
            console.log($(this).text());
        })
        // Saves new searches to array
    function savePosesToArray(userSearch) {
        console.log("savePosesToArray")
        if (poseArray.includes(userSearch)) {
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

    // Yelp API Key
    var yelpLocationAPI = "BXl-oGLTGuQQ1mZjGZ3mGnAMpz8-Xp_I0dASCnxX0t9wFJNCFyh_M1Gsad-kQT7kXHOomdEt5u3nBTS4lcW7FdaTiqaPw--075rZ9jMLYX_QyVmv18DsYy4CdgncX3Yx"
        // Ajax call to API to find closest yoga studio 
    function findStudioNearYou(location) {
        $("#ZipError").empty();

        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Yoga Studio&location=' + location + '&sort_by=distance',
            headers: {
                "Authorization": "Bearer BXl-oGLTGuQQ1mZjGZ3mGnAMpz8-Xp_I0dASCnxX0t9wFJNCFyh_M1Gsad-kQT7kXHOomdEt5u3nBTS4lcW7FdaTiqaPw--075rZ9jMLYX_QyVmv18DsYy4CdgncX3Yx"
            },

            success: function(result) {
                console.log(result)
                var yogaBusiness = result.businesses[0].name
                var yogaBusPhone = result.businesses[0].display_phone
                var yogaBusAddress = "";

                var returnedBusinessInfo = result.businesses[0].location.display_address;
                // Looping through length of the API results for location dispaly address to return fields
                for (var i = 0; i < returnedBusinessInfo.length; i++) {
                    yogaBusAddress += returnedBusinessInfo[i] + "<br>";
                }

                $(".zipPlaceholder").removeClass("is-hidden");
                $(".businessName").html(yogaBusiness);
                $(".phonenumber").html(yogaBusPhone);
                $(".address").html(yogaBusAddress);
            },

            // Complete function added to account for invalid user input or server errors
            complete: function(completeResult) {
                console.log(completeResult.status);
                if (completeResult.status != 200) {
                    $("#ZipError").html(`<article class="message is-danger mt-6">
                        <div class="message-body">
                            ${completeResult.responseJSON.error.code} - Please try your search again.
                        </div>
                    </article>`);
                }
            }
        });
    }

    // Button for yoga studio location search w/ zippcode
    $(".btn-zip").on("click", function() {
        var zipSearch = $("#zipSearch").val();
        $(".zipPlaceholder").addClass("is-hidden");
        findStudioNearYou(zipSearch);
        // Clearing the input field so it is ready for the next search
        $("#zipSearch").val("");
    })
})