var button = document.getElementById('button');
var input =  document.getElementById('text');

var outputContainer = document.getElementById('outputContainer');
var freeContaininer = document.getElementById('free');

button.addEventListener('click', function(e){
    e.preventDefault();
    freeContaininer.innerHTML = '';
    console.log(input.value);
    fetch("http://localhost:3000/courseQuery",  {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            courseQuery: input.value
        })
    }).then(function(data){
        return data.json() 
    }).then(function(data){
        outputContainer.style.display = "block";
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var youtubeDiv = document.createElement('div');
            youtubeDiv.setAttribute("class", "youtubeVideo");
            var playlist_cover = document.createElement("img");
            playlist_cover.src = data[i].thumbnail;
            playlist_cover.width = "200";
            playlist_cover.height ="200";
            playlist_cover.setAttribute('class','playlist-cover');
            var playlist_name = document.createElement("p");
            playlist_name.setAttribute('class','playlist-name');
            playlist_name.appendChild(document.createTextNode(data[i].title));
            youtubeDiv.appendChild(playlist_cover);
            youtubeDiv.appendChild(playlist_name);
            playlist_cover.onclick ="window.open(" + data[i].url +")";

            freeContaininer.appendChild(youtubeDiv);
        }
    })
})