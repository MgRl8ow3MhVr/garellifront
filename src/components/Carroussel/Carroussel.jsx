import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Carroussel.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Carroussel({ cat }) {
  const [sel, setSel] = useState(true);
  const [cptPage1, setcptPage1] = useState(1);
  const [cptPage2, setcptPage2] = useState(0);
  const [classTyp, setClassTyp] = useState("my-node");
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="boxesContainer" id={`cat_${cat}`}>
      <button
        className="buttonNext"
        onClick={() => {
          setSel(!sel);
          setClassTyp("my-node-inv");
          // console.log('sel',sel)
          if (sel) {
            setcptPage2(cptPage2 - 2);
          } else {
            setcptPage1(cptPage1 - 2);
          }
        }}
      >
        PREV
      </button>
      <button
        className="buttonPrev"
        onClick={() => {
          setSel(!sel);
          setClassTyp("my-node");
          if (sel) {
            setcptPage2(cptPage2 + 2);
          } else {
            setcptPage1(cptPage1 + 2);
          }
        }}
      >
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
            <div>
              <div
                className="catwrite"
                data-aos="fade-right"
                data-aos-duration="500"
                data-aos-delay={500}
              >
                cat {cat}
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={500}
              >
                {cptPage1}
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          nodeRef={nodeRef2}
          in={!sel}
          timeout={1000}
          classNames={classTyp}
          unmountOnExit
        >
          <div className="box second" ref={nodeRef2}>
            <div>
              <div
                className="catwrite"
                data-aos="fade-right"
                data-aos-duration="500"
                data-aos-delay={500}
              >
                cat {cat}
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay={500}
              >
                {cptPage2}
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default Carroussel;
