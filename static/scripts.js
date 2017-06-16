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
        console.log(test.value);
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
            console.log(entry);
            newHtmlString += "<li>" + entry + "</li>";
        })
        newHtmlString += "</ul>";
        $('#results').html(newHtmlString);
    });
}

function getTrackNumber(queryString) {
    console.log(queryString);
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(queryString);
    console.log(matches[matches.length - 1]);
}

function trackUrl(queryString) {
    var searchUrl = "https://freemusicarchive.org/api/get/tracks.json?track_id=" + queryString + "&api_key=BESSHG06KZV7PRPT";
    $.getJSON(searchUrl, function(data) {
        console.log(data);
    });
}