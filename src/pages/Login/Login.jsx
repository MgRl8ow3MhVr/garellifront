import "./Login.css";
import { useState } from "react";
import { appStore } from "../../store/store";
import logo1 from "../../assets/icons/logobosco.png";
import logo2 from "../../assets/icons/logog95.png";
import Button from "../../components/Button/Button";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const apiLogin = appStore((state) => state.apiLogin);

  return (
    <div className="loginContainer">
      <div className="loginBlockUp">
        <div className="loginTitle">MON PARCOURS GARELLI</div>
        <input
          type="text"
          placeholder="Identifiant"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button
          text="Connexion"
          action={() => {
            apiLogin({ identifier, password });
          }}
          disabled={identifier.length < 2 || password.length < 6}
        />
      </div>
      <div className="loginBlockDown">
        <img src={logo1} />
        <img src={logo2} />
      </div>
    </div>
  );
};

export default LoginPage;
