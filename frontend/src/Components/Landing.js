import React, { useState, useEffect } from 'react';
import stylex from "@ladifire-opensource/stylex";

export default function Landing() {
    const styles = stylex.create({
        root: {
            color: "black",
            padding: "10px"
        },

        core: {
            fontWeight: 700
        },

        inputGroup: {
            width: "40%",
            height: "30px",
            alignItems: "center", 
            left: "45%"
        },

        searchButton: {
            color: "#212529",
            height: "30px",
            backgroundColor: "#7cc",
            borderColor: "#5bc2c2"
        }
    });

    const [courses, setCourses] = useState('Schez');

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
        setCourses(data[0].title.stringify);
        console.log(data);
    })
    })

    return (
        <div className={stylex(styles.root)}>
            <div>
                <h1 className={stylex(styles.core)}>CoRe</h1>
                <p>find the best course alternatives, where less is <i>core</i></p>
            </div>

            <div>
                <input type="search" name="text" id="text"  className={stylex(styles.inputGroup)}
                placeholder="enter a course name" aria-label="Search" aria-describedby="search-addon" />
                <button className={stylex(styles.searchButton)} type="button" id="button" >search</button>
            </div>
        </div>
    )
}
