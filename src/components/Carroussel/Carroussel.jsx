import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Carroussel.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Carroussel({ cat }) {
  const [cptPage, setcptPage] = useState(1);
  const [cptPagePrevious, setcptPagePrevious] = useState(1);
  const [classTyp, setClassTyp] = useState("my-node");
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="boxesContainer" id={`cat_${cat}`}>
      {cptPage > 0 && (
        <button
          className="buttonNext"
          onClick={() => {
            setClassTyp("my-node-inv");
            setcptPagePrevious(cptPage);
            setcptPage(cptPage - 1);
          }}
        >
          PREV
        </button>
      )}

      <button
        className="buttonPrev"
        onClick={() => {
          setClassTyp("my-node");
          setcptPagePrevious(cptPage);
          setcptPage(cptPage + 1);
        }}
      >
        NEXT
      </button>
      <div className="boxesContainer">
        <CSSTransition
          nodeRef={nodeRef}
          in={cptPage % 2}
          timeout={500}
          classNames={classTyp}
          // classNames="my-node-inv"
          unmountOnExit
        >
          <div className="box" ref={nodeRef}>
            <div>
              <div
                className="catwrite"
                data-aos="fade-down"
                data-aos-duration="800"
                // data-aos-delay={500}
              >
                cat {cat}
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="800"
                // data-aos-delay={500}
              >
                {cptPage % 2 ? cptPage : cptPagePrevious}
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          nodeRef={nodeRef2}
          in={!(cptPage % 2)}
          timeout={500}
          classNames={classTyp}
          unmountOnExit
        >
          <div className="box second" ref={nodeRef2}>
            <div>
              <div
                className="catwrite"
                data-aos="fade-down"
                data-aos-duration="800"
                // data-aos-delay={500}
              >
                cat {cat}
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="800"
                // data-aos-delay={500}
              >
                {cptPage % 2 ? cptPagePrevious : cptPage}
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default Carroussel;
