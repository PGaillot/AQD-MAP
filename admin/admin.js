function loadPage(pageName) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('content-wrapper').innerHTML = this.responseText;
        }
    };
    xhttp.open('GET', './' + pageName + '/' + pageName + '.html', true);
    xhttp.send();
};


