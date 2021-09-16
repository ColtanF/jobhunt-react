import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { useHistory } from "react-router";

const url = "http://coltanfranke-jobhunt-api.herokuapp.com/login";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({});
  const [loginFormIssues, setLoginFormIssues] = useState({});
  const [error, setError] = useState("");
  const history = useHistory();

  const validateInfo = () => {
    const issues = {};
    if (!loginInfo.username) issues.username = "Please enter a username.";
    if (!loginInfo.password) issues.password = "Please enter a password.";
    return issues;
  };

  const sendData = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    };
    try {
      return fetch(url, requestOptions).then((data) => data.json());
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const issues = validateInfo();
    setLoginFormIssues(issues);
    if (Object.keys(issues).length === 0) {
      const responseData = await sendData();
      if (responseData.error) {
        setError(responseData.error);
        return;
      } else {
        history.push("/", { action: "logged_in" });
      }
    }
  };
  return (
    <main>
      <section className="section auth-form">
        <h1>Login</h1>
        {error && <Message negative>{error}</Message>}
        <Form>
          <Form.Input
            type="text"
            error={loginFormIssues?.username}
            label="Username:"
            value={loginInfo.username}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, username: e.target.value })
            }
          ></Form.Input>
          <Form.Input
            type="password"
            error={loginFormIssues?.password}
            label="Password:"
            value={loginInfo.password}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
          <Button type="submit" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </section>
    </main>
  );
}
