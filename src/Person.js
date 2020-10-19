import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle, Col } from "reactstrap";

export default function Person(props) {
  /* destructuing assignment of props to get individual variables */
  let {
    id,
    firstName,
    lastName,
    birthDate,
    age,
    editPerson,
    deletePerson,
  } = props;
  return (
    <Col xs="12" lg="6">
      <Card className="mb-3">
        <CardBody>
          <CardTitle tag="h5">
            {firstName} {lastName}
          </CardTitle>
          <CardText>
            was born {birthDate}
            {age >= 18 ? ", " : " and " /* if/else -> use ternary operator*/}
            is {age} years old
            {age >= 18 && " and of legal age" /* if -> use && operator*/}!
          </CardText>
          <Button
            color="danger"
            className="float-right "
            onClick={() => deletePerson(id)}
          >
            Delete
          </Button>
          <Button
            color="secondary"
            tag={Link}
            className="float-right mr-2"
            to={"person/" + id}
          >
            Edit
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
}
