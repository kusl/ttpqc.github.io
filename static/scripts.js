$(document).ready(function() {
    console.log('Lets get started!');
    var results = ["apple", "ball", "cat", "dog", "egg"];
    var myHtmlString = "<ul>";
    results.forEach(function(entry) {
        myHtmlString += "<li>" + entry + "</li>";
    })
    myHtmlString += "</ul>";
    $('#results').html(myHtmlString);
    $("#queryString").keyup(function() {
        console.log($("#queryString")[0].value);
        trackSearch($("#queryString")[0].value);
    });
    $("#queryString").keypress(function(e) {
        if (e.which == 13) {
            console.log("Please don't press enter. Be kind to the ajax.");
            event.preventDefault();
            return false;
        }
    });
});

function trackSearch(queryString) {
    var searchUrl = "https://freemusicarchive.org/api/trackSearch?q=" + queryString + "&api_key=BESSHG06KZV7PRPT";
    // var searchUrl = "https://freemusicarchive.org/api/trackSearch?q=deerhoof&limit=10";
    $.getJSON(searchUrl, function(dataset) {
        var newHtmlString = "<ul>";
        dataset.aRows.forEach(function(entry) {
            let trackNumber = getTrackNumber(entry);
            if (null != trackNumber) {
                var trackData = getTrackData(trackNumber);
                if (trackData != undefined) {
                    trackUrl = trackData.track_file;
                    console.log(trackUrl);
                }

                // var a = document.createElement('a');
                // var linkText = document.createTextNode(trackTitle);
                // console.log("hello there " + trackUrl);
                // a.appendChild(linkText);
                // a.title = trackTitle;
                // a.href = trackUrl;
                // newHtmlString += "<li>" + a + "</li >";
            }
        })
        newHtmlString += "</ul>";
        $('#results').html(newHtmlString);
    });
}

function getTrackNumber(queryString) {
    var regExp = /.*\(\K[^)]+/;
    console.log(`The query string for get track number is ${queryString}`);
    var matches = queryString.match(/\(([^)]*)\)[^(]*$/)[1];
    console.log(`The result fo the regular expression matches, the track number is ${matches}`);
    if (null !== matches) {
        return matches;
    } else {
        return null;
    }
}

function getTrackData(queryString) {
    var searchUrl = "https://freemusicarchive.org/api/get/tracks.json?track_id=" + queryString + "&api_key=BESSHG06KZV7PRPT";
    $.getJSON(searchUrl, function(data) {
        // console.log("get track url " + "https://files.freemusicarchive.org/" + data.dataset[0].track_file);
        return "https://files.freemusicarchive.org/" + data.dataset[0];
    });
}