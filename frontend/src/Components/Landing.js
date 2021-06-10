import React, { useState, useEffect } from 'react';

export default function Landing() {
    const [name, setName] = useState('Schez');

    useEffect(() => {
        // Update the document title using the browser API
      //  document.title = `You clicked ${count} times`;
      fetch("http://localhost:5000/courseQuery",  {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            courseQuery: "javascript"
        })
    }).then(function(data){
        return data.json() 
    }).then(function(data){
        console.log(data);
    })
    })
        
    

    return (
        <div>
            <button>get name</button>
            <h1>My name is {name}</h1>
        </div>
    )
}
