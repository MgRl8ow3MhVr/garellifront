import "./App.css";
import Carroussel from "./components/Carroussel/Carroussel";
import Selector from "./components/Selector/Selector";
import MenuPopUp from "./components/Menu/Menu";

function App() {
  return (
    <div>
      <MenuPopUp />
      {/* <Selector /> */}
      <Carroussel cat={1} />
      {/* <Carroussel cat={2}/>
       <Carroussel cat={3}/>
       <Carroussel cat={4}/> */}
    </div>
  );
}

export default App;
