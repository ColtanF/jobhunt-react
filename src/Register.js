import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { useHistory } from "react-router";

const url = "http://coltanfranke-jobhunt-api.herokuapp.com/register";

export default function Register() {
  const [registerInfo, setRegisterInfo] = useState({});
  const [invalidFormFields, setInvalidFormFields] = useState({});
  const [error, setError] = useState("");
  const history = useHistory();

  const validateInfo = () => {
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

  const sendData = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerInfo),
    };
    try {
      return fetch(url, requestOptions).then((data) => data.json());
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const issues = validateInfo();
    setInvalidFormFields(issues);
    if (Object.keys(issues).length === 0) {
      const responseData = await sendData();
      if (responseData.error) {
        setError(responseData.error);
        return;
      } else history.push("/", { action: "registered" });
    }
  };
  return (
    <main>
      <section className="section auth-form">
        <h1>Register</h1>
        {error && <Message negative>{error}</Message>}
        <Form>
          <Form.Input
            required
            error={invalidFormFields?.name}
            value={registerInfo.name}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, name: e.target.value })
            }
            type="text"
            label="Name:"
          />
          <Form.Input
            required
            error={invalidFormFields.email ? invalidFormFields.email : null}
            type="email"
            value={registerInfo.email}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, email: e.target.value })
            }
            label="Email:"
          />
          <Form.Input
            required
            error={
              invalidFormFields.username ? invalidFormFields.username : null
            }
            type="text"
            value={registerInfo.username}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, username: e.target.value })
            }
            label="Username:"
          />
          <Form.Input
            required
            error={
              invalidFormFields.password ? invalidFormFields.password : null
            }
            type="password"
            value={registerInfo.password}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, password: e.target.value })
            }
            label="Password:"
          />
          <Form.Input
            required
            error={invalidFormFields.confirm ? invalidFormFields.confirm : null}
            type="password"
            value={registerInfo.confirm}
            onChange={(e) =>
              setRegisterInfo({ ...registerInfo, confirm: e.target.value })
            }
            label="Confirm Password:"
          />
          <Button type="submit" onClick={handleRegister}>
            Register
          </Button>
        </Form>
      </section>
    </main>
  );
}
