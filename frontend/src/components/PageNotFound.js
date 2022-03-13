import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <br/>
            <br/>
            <p>Oops! That page could not be found.</p> 
            <br/>
            <p>Go back to <Link activeClassName='is-active' replace to={`/MyDetails`}>home</Link>.</p>
        </div>
    )
}

export default PageNotFound;