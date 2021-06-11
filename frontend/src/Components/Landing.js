import React, { useState, useEffect } from 'react';
import stylex from "@ladifire-opensource/stylex";


export default function Landing() {
    const styles = stylex.create({
        root: {
            backgroundColor: "#FF0000"
        },
    });

    const [name, setName] = useState('Schez');

    useEffect(() => {
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
        setName(data[0].title.stringify);
        console.log(data);
    })
    })
        
    

    return (
        <div className={stylex(styles.root)}>
            <button>get name</button>
            <h1>My name is {name}</h1>
        </div>
    )
}
