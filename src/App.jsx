import './App.css'
import Carroussel from './components/Carroussel/Carroussel';
import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";

function App() {
  const [sel, setSel] = useState(true);
  const [cptPage1, setcptPage1] = useState(1);
  const [cptPage2, setcptPage2] = useState(0);
  const [classTyp, setClassTyp] = useState('my-node');
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  return (
    <div>
      <div className='cont1'>
       <Carroussel/>
      </div>
      <div className='cont1'>
       <Carroussel/>
      </div>
      <div className='cont1'>
       <Carroussel/>
      </div>
      <div className='cont1'>
       <Carroussel/>
      </div>
      
    </div>
  );
}

export default App
