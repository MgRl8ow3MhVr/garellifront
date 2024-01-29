import "./App.css";
import Category from "./components/Category/Category";

import Selector from "./components/Selector/Selector";
import MenuPopUp from "./components/Menu/Menu";

function App() {
  return (
    <div>
      <MenuPopUp />
      {/* <Selector /> */}
      <Category cat={1} />
    </div>
  );
}

export default App;
