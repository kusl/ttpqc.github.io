$(document).ready(function() {
    console.log('Lets get started!');
    var results = ["apple", "ball", "cat", "dog", "egg"];
    var myHtmlString = "<ul>";
    results.forEach(function(entry) {
        myHtmlString += "<li>" + entry + "</li>";
    })
    myHtmlString += "</ul>";
    $('#results').html(myHtmlString);
    var test = document.getElementById("queryString");
    test.addEventListener("keyup", function(event) {
        if (test.value.length > 2) {
            $('#query').html(test.value);
            trackSearch(test.value);
        }
    }, false);
});

function trackSearch(queryString) {
    var searchUrl = "https://freemusicarchive.org/api/trackSearch?q=" + queryString + "&api_key=BESSHG06KZV7PRPT";
    // var searchUrl = "https://freemusicarchive.org/api/trackSearch?q=deerhoof&limit=10";
    $.getJSON(searchUrl, function(dataset) {
        var newHtmlString = "<ul>";
        dataset.aRows.forEach(function(entry) {
            var trackNumber = getTrackNumber(entry);
            if (null != trackNumber) {
                newHtmlString += "<li>" + getTrackUrl(trackNumber) + "</li>";
            }
        })
        newHtmlString += "</ul>";
        $('#results').html(newHtmlString);
    });
}

function getTrackNumber(queryString) {
    var regExp = /.*\(\K[^)]+/;
    console.log(queryString);
    var matches = queryString.match(/\(([^)]*)\)[^(]*$/)[1];
    console.log(matches);
    if (null !== matches) {
        return matches;
    } else {
        return null;
    }
}

function getTrackUrl(queryString) {
    var searchUrl = "https://freemusicarchive.org/api/get/tracks.json?track_id=" + queryString + "&api_key=BESSHG06KZV7PRPT";
    $.getJSON(searchUrl, function(data) {
        console.log(data);
    });
}