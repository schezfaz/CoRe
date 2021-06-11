import React, { useState } from 'react';
import stylex from "@ladifire-opensource/stylex";
import Card from './Card.js';

export default function Landing() {
    const styles = stylex.create({
        root: {
            color: "black",
            fontFamily:"Roboto, sans-serif",
            margin: "0"
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
            border: "none",
            borderRadius: "4px",
            minWidth: "70px",
            padding: "10px",
            height: "44px",
            textAlign: "center",
            color: "rgb(255, 255, 255)",
            backgroundColor: "rgb(33, 150, 243)",
            fontSize: "20px",
            fontWeight: "500",
            overflow: "hidden",
            outline: "none",
            cursor: "pointer",
            transition: "box-shadow 0.2s",
            marginLeft: "5px"
        },
        materialTextFieldInput: {
            fontSize: "20px",
            outline: "none",
            height: "40px",
            paddingLeft: "10px",
            paddingRight: "10px",
            width: "40%",
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "1rem 0.7rem",
            color: "black",
            transition: "0.1s ease-out"
        },
        card: {
             background: "#fff",
             borderRadius: "3px",
             display: "inline-block",
             height: "320px",
             margin: "1rem",
             position: "relative",
             width: "290px",
             overflow: "hidden",
             boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
        },
        cardTop: {
            display: "inline-flex",
            width: "100%",
            height: "220px",
            overflow: "hidden",
            justifyContent: "center"
        },
        cardP: {
            textAlign: "left",
            height: "50px",
            width: "100%",
            boxSizing: "border-box",
            margin: "0",
            padding: "0",
            paddingLeft: "20px",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#000",
            fontSize: "18px"
        },
        cardP2: {
            textAlign: "left",
            height: "30px",
            width: "50%",
            boxSizing: "border-box",
            margin: "0",
            padding: "0",
            float: "left",
            paddingLeft: "20px",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#666",
            fontSize: "18px"
        },
        cardP3: {
            textAlign: "right",
            height: "30px",
            width: "50%",
            float: "right",
            boxSizing: "border-box",
            margin: "0",
            padding: "0",
            paddingLeft: "20px",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#666",
            fontSize: "18px"
        }
    });

    const [youtubeCourses, setYoutubeCourses] = useState([]);
    const [udacityCourses, setUdacityCourses] = useState([]);
    const [udemyCourses, setUdemyCourses] = useState([]);
    const [inputQuery, setInputQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        event.preventDefault();
        fetch("http://localhost:5000/courseYoutubeQuery",  {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                courseQuery: inputQuery
            })
        }).then(function(data) {
            return data.json();
        }).then(function(data){
            setYoutubeCourses(data);
            setShowResults(true);
        });
        fetch("http://localhost:5000/courseUdemyQuery",  {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                courseQuery: inputQuery
            })
        }).then(function(data) {
            return data.json();
        }).then(function(data){
            console.log(data.results);
            setUdemyCourses(data.results);
            setShowResults(true);
        });
        fetch("http://localhost:5000/courseUdacityQuery",  {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                courseQuery: inputQuery
            })
        }).then(function(data) {
            return data.json()
        }).then(function(data){
            setUdacityCourses(data.results);
            setShowResults(true);
        });
    }


    return (
        <div className={stylex(styles.root)}>
            <div>
                <h1 className={stylex(styles.core)}>CoRe</h1>
                <p>Find the best course alternatives, where less is <i>core</i></p>
            </div>
            <div>
                <input placeholder="Enter course name" type="text" className={stylex(styles.materialTextFieldInput)} onChange={(e) => setInputQuery(e.target.value)} />
                <button className={stylex(styles.searchButton)} type="button" id="button" onClick={handleSubmit} >Search</button>
            </div>
            { showResults ? 
                <div>
                    {
                        Object.keys(youtubeCourses).map((oneKey,i)=>{
                            return (
                               <Card thumbnail={youtubeCourses[oneKey]["thumbnail"]} title={youtubeCourses[oneKey]["title"]} platform="YouTube" fee="Free" url={youtubeCourses[oneKey]["url"]} />
                            )
                        })
                    }
                </div>
            : null }
            { showResults ? 
                <div>
                    {
                        Object.keys(udemyCourses).map((oneKey,i)=>{
                            return (
                               <Card thumbnail={udemyCourses[oneKey]["image_480x270"]} title={udemyCourses[oneKey]["name"]} platform="Udemy" fee={udemyCourses[oneKey]["price_info"]["amount"]} url={udemyCourses[oneKey]["url"]} />
                            )
                        })
                    }
                </div>
            : null }
            { showResults ? 
                <div>
                    {

                        Object.keys(udacityCourses).map((oneKey,i)=>{
                            return (
                               <Card thumbnail={udacityCourses[oneKey]["image"]} title={udacityCourses[oneKey]["name"]} platform="Udacity" fee={udacityCourses[oneKey]["price_info"]["amount"]} url={udacityCourses[oneKey]["course_url"]}/>
                            )
                        })
                    }
                </div>
            : null }
        </div>
    )
}
