import "./Login.css";
import { useState } from "react";
import { appStore } from "../../store/store";
import { apiUrl } from "../../config";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const apiLogin = appStore((state) => state.apiLogin);

  return (
    <div className="loginContainer">
      <div>welcome </div>
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
    </div>
  );
};

export default LoginPage;
