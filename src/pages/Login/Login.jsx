import "./Login.css";
import { useState } from "react";
import { appStore } from "../../store/store";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const apiLogin = appStore((state) => state.apiLogin);

  return (
    <div className="loginContainer">
      <div>welcome </div>
      <div>{appStore((state) => state.bears)}</div>
      <div>{appStore((state) => state.user.username)}</div>
      <div>jwt {appStore((state) => state.jwt)}</div>
      <input
        type="text"
        value={identifier}
        onChange={(e) => {
          setIdentifier(e.target.value);
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          apiLogin({ identifier, password });
        }}
      >
        Validate
      </button>
      {/* <button onClick={increasePopulation}>add</button>
      <button onClick={increaseJwt}>add</button> */}
    </div>
  );
};

export default LoginPage;
