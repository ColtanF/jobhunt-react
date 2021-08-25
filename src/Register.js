import React, { useState } from "react";
import { Form, Button, Card } from "semantic-ui-react";
import { useHistory } from "react-router";

export default function Register() {
  const [registerInfo, setRegisterInfo] = useState({});
  const [invalidFormFields, setInvalidFormFields] = useState({});
  const history = useHistory();

  const validateInfo = () => {
    console.log("data validated!");
    const issues = {};
    if (!registerInfo.name) issues.name = "Please enter a name.";
    if (!registerInfo.username) issues.username = "Please enter a username.";
    if (!registerInfo.email) issues.email = "Please enter an email address.";
    // Will also want to verify email structure w/ regex
    if (!registerInfo.password) issues.password = "Please enter a password.";
    if (!registerInfo.confirm) issues.confirm = "Please confirm your password.";
    if (registerInfo.password !== registerInfo.confirm) {
      issues.confirm = "Passwords do not match.";
    }
    return issues;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("registered user (but not really)");
    const issues = validateInfo();
    setInvalidFormFields(issues);
    if (Object.keys(issues).length === 0) {
      history.push("/");
    }
  };
  return (
    <main>
      <section className="section register-form">
        <h1>Register</h1>
        <Form>
          <Form.Field required>
            <label>Name:</label>
            <Form.Input
              error={invalidFormFields.name ? invalidFormFields.name : null}
              value={registerInfo.name}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, name: e.target.value })
              }
              type="text"
            ></Form.Input>
          </Form.Field>
          <Form.Field required>
            <label>Email:</label>
            <Form.Input
              error={invalidFormFields.email ? invalidFormFields.email : null}
              type="email"
              value={registerInfo.email}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, email: e.target.value })
              }
            ></Form.Input>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="">Username:</label>
            <Form.Input
              error={
                invalidFormFields.username ? invalidFormFields.username : null
              }
              type="text"
              value={registerInfo.username}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, username: e.target.value })
              }
            ></Form.Input>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="">Password:</label>
            <Form.Input
              error={
                invalidFormFields.password ? invalidFormFields.password : null
              }
              type="password"
              value={registerInfo.password}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, password: e.target.value })
              }
            ></Form.Input>
          </Form.Field>
          <Form.Field required>
            <label htmlFor="">Confirm password:</label>
            <Form.Input
              error={
                invalidFormFields.confirm ? invalidFormFields.confirm : null
              }
              type="password"
              value={registerInfo.confirm}
              onChange={(e) =>
                setRegisterInfo({ ...registerInfo, confirm: e.target.value })
              }
            ></Form.Input>
          </Form.Field>
          <Button type="submit" onClick={handleRegister}>
            Register
          </Button>
        </Form>
      </section>
    </main>
  );
}
