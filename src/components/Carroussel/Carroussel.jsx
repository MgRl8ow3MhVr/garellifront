import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Carroussel.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Carroussel({ cat }) {
  const [cptPage, setcptPage] = useState(1);
  const [cptPagePrevious, setcptPagePrevious] = useState(cptPage);
  const [transit, setTransit] = useState(true);
  const [moveDir, setMoveDir] = useState("right");
  const [cptCat, setcptCat] = useState(1);
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  const colors = ["#ce6a6b", "#ebaca2", "#bed3c3", "#4a919e"];

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
            setMoveDir("left");
            setcptPagePrevious(cptPage);
            setcptPage(cptPage - 1);
            setTransit(!transit);
          }}
        >
          {`< PREV`}
        </button>
      )}

      <button
        className="buttonPrev"
        onClick={() => {
          setMoveDir("right");
          setcptPagePrevious(cptPage);
          setcptPage(cptPage + 1);
          setTransit(!transit);
        }}
      >
        {`NEXT >`}
      </button>

      <button
        className="buttonDown"
        onClick={() => {
          setMoveDir("down");
          setcptCat(cptCat + 1);
          setcptPage(1);
          setcptPagePrevious(1);
          setTransit(!transit);
        }}
      >
        DOWN
      </button>

      <div className="boxesContainer">
        <CSSTransition
          nodeRef={nodeRef}
          in={transit}
          timeout={500}
          classNames={`go-${moveDir}`}
          unmountOnExit
        >
          <div
            className="box"
            ref={nodeRef}
            style={{
              backgroundColor: colors[cptCat - 1],
            }}
          >
            <div>
              <div
                className="catwrite"
                data-aos="fade-down"
                data-aos-duration="800"
                // data-aos-delay={500}
              >
                categorie {cptCat}
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="800"
                // data-aos-delay={500}
              >
                {transit ? cptPage : cptPagePrevious}
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          nodeRef={nodeRef2}
          in={!transit}
          timeout={500}
          classNames={`go-${moveDir}`}
          unmountOnExit
        >
          <div
            className="box second"
            ref={nodeRef2}
            style={{
              backgroundColor: colors[cptCat - 1],
            }}
          >
            <div>
              <div
                className="catwrite"
                data-aos="fade-down"
                data-aos-duration="800"
                // data-aos-delay={500}
              >
                categorie {cptCat}
              </div>
              <div
                data-aos="fade-up"
                data-aos-duration="800"
                // data-aos-delay={500}
              >
                {transit ? cptPagePrevious : cptPage}
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default Carroussel;
