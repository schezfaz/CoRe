var button = document.getElementById('button');
var input =  document.getElementById('text');

button.addEventListener('click', function(e){
    e.preventDefault();
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
        console.log(data)
    })
})