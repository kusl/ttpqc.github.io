document.addEventListener("DOMContentLoaded", function(event) {
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
    var searchUrl = `https://freemusicarchive.org/api/trackSearch?q=${queryString}&api_key=BESSHG06KZV7PRPT`;
    // var searchUrl = "https://freemusicarchive.org/api/trackSearch?q=deerhoof&limit=10";
    $.getJSON(searchUrl, function(dataset) {
        var newHtmlString = "<ul>";
        dataset.aRows.forEach(function(entry) {
            let trackNumber = getTrackNumber(entry);
            console.log(`The track number is ${trackNumber}`);
            if (null != trackNumber) {
                var trackData = getTrackData(trackNumber);
                console.log(`The track url is ${trackData[0].track_file}`);
            }
        })
        newHtmlString += "</ul>";
        $('#results').html(newHtmlString);
    });
}

function getTrackNumber(queryString) {
    var regExp = /.*\(\K[^)]+/;
    var matches = queryString.match(/\(([^)]*)\)[^(]*$/)[1];
    console.log(
        `
        The query string was ${queryString}. 
        The result fo the regular expression matches, the track number is ${matches}. 
        `
    );
    return matches;
}

function getTrackData(queryString) {
    var searchUrl = `https://freemusicarchive.org/api/get/tracks.json?track_id=${queryString}&api_key=BESSHG06KZV7PRPT`;
    console.log(`${searchUrl}`);
    $.getJSON(searchUrl, function(data) {
        return data.dataset;
    });
}