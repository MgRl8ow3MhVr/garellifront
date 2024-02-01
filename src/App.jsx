import "./App.css";
import Category from "./components/Category/Category";
import LoginPage from "./pages/Login/Login";

import MenuPopUp from "./components/Menu/Menu";

function App() {
  return (
    <div className="appContainer">
      <LoginPage />
      {/* <MenuPopUp /> */}
      {/* <Selector /> */}
      {/* <Category cat={1} /> */}
    </div>
  );
}

export default App;
