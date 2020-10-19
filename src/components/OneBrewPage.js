import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function OneBrewPage() {
  const [myBrew, setMyBrew] = useState({});
  const { id } = useParams();

  console.log(myBrew);

  useEffect(() => {
    getBrew();
  }, []);

  async function getBrew() {
    const data = await fetch("https://api.openbrewerydb.org/breweries/" + id);

    const parsedData = await data.json();

    setMyBrew(parsedData);
  }

  return (
    <div>
      <h1>{myBrew.name}</h1>
      <h3>{myBrew.city}</h3>
      <a href={myBrew.website_url}>{myBrew.website_url}</a>
    </div>
  );
}
