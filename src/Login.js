import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useHistory } from "react-router";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({});
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("congrats! you logged in");
    history.push("/");
  };
  return (
    <main>
      <section className="section auth-form">
        <h1>Login</h1>
        <Form>
          <Form.Input
            type="text"
            label="Username:"
            value={loginInfo.username}
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, username: e.target.value })
            }
          ></Form.Input>
          <Form.Input
            type="password"
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
