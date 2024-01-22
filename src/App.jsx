import "./App.css";
import Carroussel from "./components/Carroussel/Carroussel";
import Selector from "./components/Selector/Selector";

function App() {
  return (
    <div>
      {/* <Selector /> */}
      <Carroussel cat={1} />
      {/* <Carroussel cat={2}/>
       <Carroussel cat={3}/>
       <Carroussel cat={4}/> */}
    </div>
  );
}

export default App;
