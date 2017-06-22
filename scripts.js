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
        let searchUrl = `https://hacker-news.firebaseio.com/v0/item/${inputTextbox.value}.json`;
        console.log(searchUrl);
        let request = new XMLHttpRequest();
        request.open('GET', searchUrl, true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                let data = JSON.parse(this.response);
                console.log(data);
		if(data.type == "comment") {
			$('#results').html(data.text);
		} else if (data.type == "story") {
			$('#results').html(data.title);
		}
            } else {
                // We reached our target server, but it returned an error
		alert("Something is wrong");
            }
        };
        request.onerror = function() {
            // There was a connection error of some sort
        };
        request.send();
    }));
}
