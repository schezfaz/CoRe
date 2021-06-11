import React from 'react';
import stylex from "@ladifire-opensource/stylex";

let Card = function statelessFunctionComponentClass(props) {
    let thumbnail = props.thumbnail;
    let title = props.title;
    let fee = props.fee;
    let platform = props.platform;
    const styles = stylex.create({
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

  return (
    <div className={stylex(styles.card)}>
        <div className={stylex(styles.cardTop)}>
            <img src={thumbnail}/>
        </div>
        <div>
            <p className={stylex(styles.cardP)}>{title}</p>
        </div>
        <div>
            <p className={stylex(styles.cardP2)}>{platform}</p>
            <p className={stylex(styles.cardP3)}>{fee}</p>
        </div>
    </div>
  );
};

export default Card;