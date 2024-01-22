import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import './Carroussel.css'

function Carroussel() {
  const [sel, setSel] = useState(true);
  const [cptPage1, setcptPage1] = useState(1);
  const [cptPage2, setcptPage2] = useState(0);
  const [classTyp, setClassTyp] = useState('my-node');
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  return (
    <div>
      <button className="buttonNext" onClick={() =>{ 
        setSel(!sel)
        setClassTyp('my-node-inv')
        // console.log('sel',sel)
        if(sel){
            setcptPage2(cptPage2-2)}
            else{
            setcptPage1(cptPage1-2) 
        }
       
        }}>
        PREV
      </button>
      <button className="buttonPrev" onClick={() =>{ 
        setSel(!sel)
        setClassTyp('my-node')
        if(sel){
            setcptPage2(cptPage2+2)}
            else{
            setcptPage1(cptPage1+2) 
        }        }}>
        NEXT
      </button>
      <div className="boxesContainer"> 
      <CSSTransition
        nodeRef={nodeRef}
        in={sel}
        timeout={1000}
        classNames={classTyp}
        // classNames="my-node-inv"
        unmountOnExit
      >
        <div className="box" ref={nodeRef}>
          <div>{cptPage1}</div>
        </div>
      </CSSTransition>
      <CSSTransition
        nodeRef={nodeRef2}
        in={!sel}
        timeout={1000}
        classNames={classTyp}
        // classNames="my-node-inv"
        unmountOnExit
      >
        <div className="box second" ref={nodeRef2} 
        // style={{backgroundColor:`rgb(${20*cptPage2}, ${10*cptPage2}, ${5*cptPage2})`}}
        >
          <div >{cptPage2}</div>
        </div>
      </CSSTransition>
      </div>
      
    </div>
  );
}

export default Carroussel
