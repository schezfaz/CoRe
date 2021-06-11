import React, { useState, useEffect } from 'react';
import stylex from "@ladifire-opensource/stylex";

export default function Landing() {
    const styles = stylex.create({
        root: {
            color: "black",
            padding: "10px"
        },

        core: {
            fontWeight: 700,
            fontSize: "45px"
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
        },

        courseContainer: {
            padding: "20px",
            height: "100%"
        },

        paidContainer: {
            width: "50%",
            float: "left",
            padding: "20px",
            overflowY: "scroll",
            height: "100%",
            border: "1px solid blue"
        },

        freeContainer: {
            marginRight: "20px",
            padding: "20px",
            overflowY: "scroll",
            height: "420px",
            backgroundColor: "rgba(250, 235, 215,0.9)"
        },

        thumbnail: {
            alignContent:"center",
            width: "350px",
            height: "250px",
            border: "1px solid black"
        },

        youtubeTitle: {
            fontWeight: "bold"
        }
    });

    const [courses, setCourses] = useState([]);
    const [inputQuery, setInputQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        console.log("submitted:" +inputQuery);
        fetch("http://localhost:5000/courseQuery",  {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                courseQuery: inputQuery
            })
        }).then(function(data){
            return data.json() 
        }).then(function(data){
            setCourses(data);
            setShowResults(true);
            console.log(data);
        })
      
    }

    return (
        <div className={stylex(styles.root)}>
            <div>
                <h1 className={stylex(styles.core)}>CoRe</h1>
                <p>find the best course alternatives, where less is <i>core</i></p>
            </div>

            <div>
                <input type="search" name="text" id="text"  className={stylex(styles.inputGroup)}
                placeholder="enter a course name" aria-label="Search" aria-describedby="search-addon" 
                onChange = {(e) => setInputQuery(e.target.value)} 
                />
                <button className={stylex(styles.searchButton)} type="button" id="button" onClick={handleSubmit} >search</button>
            </div>

            { showResults ? 
                <div className={stylex(styles.courseContainer)}>
                    <div className={stylex(styles.paidContainer)}>
                        <h1>paid container</h1>
                    </div>

                    <div className={stylex(styles.freeContainer)}>
                    {
                        Object.keys(courses).map((oneKey,i)=>{
                            return (
                                <div>
                                    <a href={courses[oneKey]['url']} targer="_blank">
                                        <img alt="thumbnail" className={stylex(styles.thumbnail)} src={courses[oneKey]['thumbnail']}/>
                                    </a>                                
                                    <p className={stylex(styles.youtubeTitle)}>{courses[oneKey]['title']}</p>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            : null }
        </div>
    )
}
