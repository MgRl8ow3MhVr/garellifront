import "./App.css";

// COMPONENTS
import Category from "./components/Category/Category";
import LoginPage from "./pages/Login/Login";
import FindTeenage from "./pages/FindTeenage/FindTeenage";
import MenuPopUp from "./components/Menu/Menu";
import Snackbar from "./components/Snackbar/Snackbar";

// OTHERS
import { appStore } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/fonts/DidactGothic-Regular.ttf";

function App() {
  const user = appStore((state) => state.user);

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
            <Route path="/page1" element={<Category />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
