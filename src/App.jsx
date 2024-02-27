import "./App.css";
import { useEffect } from "react";

// PAGES
import LoginPage from "./pages/Login/Login";
import FindTeenage from "./pages/FindTeenage/FindTeenage";
import TeenProfile from "./pages/TeenProfile/TeenProfile";
import Evaluation from "./pages/Evaluation/Evaluation";

// COMPONENTS
import MenuPopUp from "./components/Menu/Menu";
import Snackbar from "./components/Snackbar/Snackbar";

// OTHERS
import { appStore } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";

function App() {
  const user = appStore((state) => state.user);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="appContainer">
      <Snackbar />
      {!user.jwt ? (
        <LoginPage />
      ) : (
        <BrowserRouter>
          <MenuPopUp />
          <Routes>
            <Route path="/" element={<FindTeenage />} />
            <Route path="/profil" element={<TeenProfile />} />
            <Route path="/evaluation" element={<Evaluation />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
