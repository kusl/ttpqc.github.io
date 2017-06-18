document.addEventListener("DOMContentLoaded", function(event) {
    let inputTextbox = document.getElementById("queryString")
    inputTextbox.addEventListener('keydown', (function(e) {
        doit(inputTextbox);
        if (e.which == 13) {
            console.log("Please don't press enter. Be kind to the ajax.");
            event.preventDefault();
            return false;
        }
    }));
});

function doit(inputTextbox) {
    inputTextbox.addEventListener('keypress', (function(e) {
        let searchUrl = `https://freemusicarchive.org/api/trackSearch?q=${inputTextbox.value}&api_key=BESSHG06KZV7PRPT`;
        console.log(searchUrl);
        let request = new XMLHttpRequest();
        request.open('GET', searchUrl, true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                let data = JSON.parse(this.response);
                console.log(data);
                let newHtmlString = "<ul>";
                data.aRows.forEach(function(entry) {
                    let trackNumber = entry.match(/\(([^)]*)\)[^(]*$/)[1];
                    console.log(`The track number is ${trackNumber}`);
                    if (null != trackNumber) {
                        let searchUrl = `https://freemusicarchive.org/api/get/tracks.json?track_id=${trackNumber}&api_key=BESSHG06KZV7PRPT`;
                        console.log(`${searchUrl}`);
                        let request = new XMLHttpRequest();
                        request.open('GET', searchUrl, true);
                        request.onload = function() {
                            if (this.status >= 200 && this.status < 400) {
                                // Success!
                                let data = JSON.parse(this.response);
                                data.dataset.forEach(function(track) {
                                    console.log(`The track title is ${track.track_title}`);
                                    newHtmlString += `<li>${track.track_title}</li>`;
                                    console.log(newHtmlString);
                                })
                            } else {
                                // We reached our target server, but it returned an error
                            }
                        };
                        request.onerror = function() {
                            // There was a connection error of some sort
                        };
                        request.send();
                    }
                })
                newHtmlString += "</ul>";
                $('#results').html(newHtmlString);
            } else {
                // We reached our target server, but it returned an error
            }
        };
        request.onerror = function() {
            // There was a connection error of some sort
        };
        request.send();
    }));
}