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

    function handleSubmit(event) {
        event.preventDefault();
        var courses = [{"title":"Full Video: Tum Se Hi | Jab We Met | Kareena Kapoor, Shahid Kapoor | Mohit Chauhan | Pritam","url":"https://youtube.com/watch?v=mt9xg0mmt28","thumbnail":"https://i.ytimg.com/vi/mt9xg0mmt28/hq720.jpg"},{"title":"Can You Say Hi Song | VoVing Coloring Nursery Rhymes & Kids Songs","url":"https://youtube.com/watch?v=AEVeziZyeFY","thumbnail":"https://i.ytimg.com/vi/AEVeziZyeFY/hq720.jpg"},{"title":"Vlad and Niki have fun in museums and playgrounds","url":"https://youtube.com/watch?v=hi-uBNLxyPA","thumbnail":"https://i.ytimg.com/vi/hi-uBNLxyPA/hq720.jpg"},{"title":"Chat Deni Maar Deni khinch ke Tamacha hi hi has Deli Pinky Ke Papa","url":"https://youtube.com/watch?v=nUouZHurUm4","thumbnail":"https://i.ytimg.com/vi/nUouZHurUm4/hq720.jpg"},{"title":"james charles saying \"hi sisters\" BUT speed increases every time","url":"https://youtube.com/watch?v=QqCDZOP-UAU","thumbnail":"https://i.ytimg.com/vi/QqCDZOP-UAU/hq720.jpg"},{"title":"Full Song: Garmi | Street Dancer 3D | Varun D, Nora F, Badshah, Neha K | Remo D","url":"https://youtube.com/watch?v=IE8OD5FbU-c","thumbnail":"https://i.ytimg.com/vi/IE8OD5FbU-c/hq720.jpg"},{"title":"Tujhko Hi Dulhan Banunga - Chalo Ishq Ladaaye | Govinda & Rani | Sonu Nigam & Alka Yagnik","url":"https://youtube.com/watch?v=UwsiJs09OPY","thumbnail":"https://i.ytimg.com/vi/UwsiJs09OPY/hq720.jpg"},{"title":"Full Video: Papa Mere Papa | Main Aisa Hi Hoon | Sushmita Sen |  Himesh Reshammiya","url":"https://youtube.com/watch?v=bhRswBsogNw","thumbnail":"https://i.ytimg.com/vi/bhRswBsogNw/hq720.jpg"},{"title":"COOL NEW GADGETS AVAILABLE ON AMAZON AND ONLINE | HI-TECH GADGETS UNDER Rs500, Rs1000, Rs10K","url":"https://youtube.com/watch?v=-MlXIwvr8Z0","thumbnail":"https://i.ytimg.com/vi/-MlXIwvr8Z0/hq720.jpg"},{"title":"Hi Me In 5 Years","url":"https://youtube.com/watch?v=AKJfakEsgy0","thumbnail":"https://i.ytimg.com/vi/AKJfakEsgy0/hq720.jpg"}];
        var cards = []
        courses.forEach(function(v) {
           
        });
    }
    

    return (
        <div className={stylex(styles.root)}>
            <div>
                <h1 className={stylex(styles.core)}>CoRe</h1>
                <p>Find the best course alternatives, where less is <i>core</i></p>
            </div>
            <div>
                <input placeholder="Enter course name" type="text" className={stylex(styles.materialTextFieldInput)}/>
                <button className={stylex(styles.searchButton)} type="button" id="button" onClick={handleSubmit} >Search</button>
            </div>
            <div id="search-results">
            </div>
        </div>
    )
}
