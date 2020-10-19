import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BreweryPage() {
  const [myData, setData] = useState([]);

  useEffect(() => {
    console.log("MOUNTED");
    getBrew();
  }, []);

  async function getBrew() {
    const myData = await fetch(
      "https://api.openbrewerydb.org/breweries?page=15"
    );

    const parsedData = await myData.json();
    console.log(parsedData);
    setData(parsedData);
  }

  return (
    <div>
      <h1>Brewery Page</h1>
      {myData.map((index) => {
        return (
          <Link key={index.id} to={"/brew/" + index.id}>
            <h3>{index.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}
