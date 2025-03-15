import React from "react";

let date = new Date().getFullYear();

function Footer(){
    return (
        <footer className="Footer" >
            <p> Copyright @{date}</p>
        </footer>
    );
}

export default Footer;