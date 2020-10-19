import React from "react";
import { Link } from "react-router-dom";

export default function MyHeader() {
  return (
    <div className="myHeader bg-primary">
      <Link to="/" className="text-light">
        {" "}
        <h3>logo</h3>
      </Link>
      <div className="routes">
        <Link to="/" className="text-light">
          <h3>HomePage</h3>
        </Link>
        <Link to="/brew" className="text-light">
          <h3>BreweryPage</h3>
        </Link>
        <Link to="/input" className="text-light">
          <h3>InputPage</h3>
        </Link>
      </div>
    </div>
  );
}
