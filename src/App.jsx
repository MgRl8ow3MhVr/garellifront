import "./App.css";

// COMPONENTS
import Category from "./components/Category/Category";
import LoginPage from "./pages/Login/Login";
import FindTeenage from "./pages/FindTeenage/FindTeenage";
import MenuPopUp from "./components/Menu/Menu";

// OTHERS
import { appStore } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const jwt = appStore((state) => state.jwt);
  console.log("jwt est", jwt);

  return (
    <div className="appContainer">
      {!jwt ? (
        <LoginPage />
      ) : (
        <BrowserRouter>
          <MenuPopUp />
          <Routes>
            <Route path="/" element={<FindTeenage />} />
            <Route path="/page1" element={<Category />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
