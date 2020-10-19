import React, { useEffect, useState } from "react";
import Person from "../Person";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function ListPersons() {
  // create all Persons as a as a state variable
  // give it the value empty array...
  // (note the destructuring assignment)
  const [allPersons, setAllPersons] = useState([]);

  async function fetchPersons() {
    setAllPersons(await (await fetch("/api/persons")).json());
  }

  // useEffect a function to run when something has changed
  // + an array of things (state varibeles) to watch for change
  // (but if called with an empty array only runs ONCE - when the component mounts)
  useEffect(() => {
    fetchPersons();
  }, []);

  async function deletePerson(id) {
    let result = await (
      await fetch("/api/persons/" + id, { method: "DELETE" })
    ).json();
    console.log("Result of deleting", result);
    await fetchPersons();
  }

  return (
    <>
      {" "}
      {/* 
        The fragment tag/element let us encapsulate several
        in one virtual parent element without that is not rendered
        to the DOM - but needed for a correct jsx expression
      */}
      <div className="row">
        <div className="col-12">
          <h2 className="text-primary my-4">
            A list of all persons
            <Button
              color="primary"
              tag={Link}
              className="float-right"
              to="/person/new"
            >
              Add new person
            </Button>
          </h2>
        </div>
      </div>
      <div className="row">
        {/* Loops in jsx are normally created by using map on an array */}
        {allPersons
          .map((person) => {
            // calculate age
            let today = new Date().toISOString().split("T")[0];
            let born = person.birthDate;
            let age =
              today.slice(0, 4) -
              born.slice(0, 4) -
              (born.slice(-5) > today.slice(-5));
            return { ...person, age };
          })
          .map((person) => (
            <Person
              key={person.id}
              {...{ ...person, deletePerson }}
              /*{...person} shorthand for sending a whole object as props*/
              /*firstName={person.firstName}
          lastName={person.lastName}
          birthDate={person.birthDate}*/
            />
          ))}
      </div>
    </>
  );
}
