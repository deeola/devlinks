/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Login to continue</Link>
            </div>
        </article>
  );
};

export default Missing;
