import React from "react";
import rootImage from './root_page.jpeg';

export default function RootPage(){
    return <div style={{overflow: "hidden", display: "flex", flexDirection: "column"}}>
        <img src={rootImage} alt="abc"/>
    </div>
}