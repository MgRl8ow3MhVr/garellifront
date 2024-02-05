import "./Login.css";
import { useState } from "react";
import { appStore } from "../../store/store";
import logo1 from "../../assets/logobosco.png";
import logo2 from "../../assets/logog95.png";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const apiLogin = appStore((state) => state.apiLogin);

  return (
    <div className="loginContainer">
      <div className="loginBlockUp">
        <div className="loginTitle">ACQUIS DES JEUNES</div>
        {/* <div>{appStore((state) => state.bears)}</div> */}
        <div style={{ height: "5rem" }}></div>
        <input
          type="text"
          placeholder="identifiant"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
          }}
        />
        <div style={{ height: "2rem" }}></div>
        <input
          type="password"
          placeholder="mot de passe"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div style={{ height: "2rem" }}></div>

        <button
          onClick={() => {
            apiLogin({ identifier, password });
          }}
        >
          Valider
        </button>
      </div>
      <div className="loginBlockDown">
        <img src={logo1} />
        <img src={logo2} />
      </div>

      {/* <button onClick={increasePopulation}>add</button>
      <button onClick={increaseJwt}>add</button> */}
    </div>
  );
};

export default LoginPage;
