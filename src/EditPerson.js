import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Form, Label, Input, Button } from "reactstrap";
import { useParams, Redirect } from "react-router-dom";

export default function EditPerson() {
  const { id } = useParams();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    // If id is "new" then do nothing - we don't need to fetch data
    if (id === "new") {
      setFormData({ firstName: "", lastName: "", birthDate: "" });
      return;
    }
    // Since you should not make useEffect function async
    // we need to create another function that is async
    // in order to use await with our fetch
    // in this case we call the async function right after defining it
    (async () =>
      setFormData(await (await fetch("/api/persons/" + id)).json()))();
  }, [id]);

  // If formData contains an error (from REST api) then return to the front page
  if (formData.error || formData.done) {
    return <Redirect to="/" />;
  }

  const handleInputChange = (e) =>
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  let { firstName, lastName, birthDate } = formData;

  // Do not render anything until we have fetched
  // the data...
  if (firstName === undefined) {
    return null;
  }

  function cancel() {
    setFormData({ done: true });
  }

  async function save(e) {
    // the default behavior of a form submit is to reload the page
    // stop that - we are not barbarians, we ar SPA developers!
    e.preventDefault();
    // Send the data to the REST api
    let result = await (
      await fetch("/api/persons/" + (id === "new" ? "" : id), {
        method: id === "new" ? "POST" : "PUT",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    setFormData({ done: true });
  }

  return (
    <>
      <Row className="mt-4">
        <Col xs="12">
          <h2>
            {id === "new"
              ? "Add new person"
              : "Editing " + firstName + " " + lastName}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Form onSubmit={save}>
            <FormGroup>
              <Label className="w-100">
                First name
                <Input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  onChange={handleInputChange}
                  value={firstName}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label className="w-100">
                Last name
                <Input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  onChange={handleInputChange}
                  value={lastName}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label className="w-100">
                Birth date
                <Input
                  name="birthDate"
                  type="text"
                  placeholder="Birth date"
                  onChange={handleInputChange}
                  value={birthDate}
                />
              </Label>
            </FormGroup>
            <div className="float-right">
              <Button color="danger" onClick={cancel}>
                Cancel
              </Button>
              <input
                type="submit"
                className="ml-3 btn btn-primary"
                value="Save"
              />
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}
