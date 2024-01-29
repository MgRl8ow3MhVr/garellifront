import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Category.css";
import Question from "../Question/Question";
import AOS from "aos";
import "aos/dist/aos.css";

function Category({ cat }) {
  const [transit, setTransit] = useState(true);
  const [moveDir, setMoveDir] = useState("right");
  const [cptCat, setCptCat] = useState(0);
  const [cptCatPrevious, setCptCatPrevious] = useState(cptCat);
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  const colors = ["#ce6a6b", "#ebaca2", "#bed3c3", "#4a919e"];

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="CategoryContainer">
      <button
        className="buttonUp"
        onClick={() => {
          setMoveDir("up");
          setCptCatPrevious(cptCat);
          setCptCat(cptCat - 1);
          setTransit(!transit);
        }}
      >
        {`UP`}
      </button>

      <button
        className="buttonDown"
        onClick={() => {
          setMoveDir("down");
          setCptCatPrevious(cptCat);
          setCptCat(cptCat + 1);
          setTransit(!transit);
        }}
      >
        DOWN
      </button>

      <CSSTransition
        nodeRef={nodeRef}
        in={transit}
        timeout={500}
        classNames={`go-${moveDir}`}
        unmountOnExit
      >
        <div
          className="CategoryBox"
          ref={nodeRef}
          style={{
            backgroundColor: transit ? colors[cptCat] : colors[cptCatPrevious],
          }}
        >
          <div>
            <div
              className="CategoryText"
              data-aos="fade-down"
              data-aos-duration="800"
              // data-aos-delay={500}
            >
              categorie {transit ? cptCat : cptCatPrevious}
            </div>
            <Question />
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
          className="CategoryBox"
          ref={nodeRef2}
          style={{
            backgroundColor: !transit ? colors[cptCat] : colors[cptCatPrevious],
          }}
        >
          <div>
            <div
              className="CategoryText"
              data-aos="fade-down"
              data-aos-duration="800"
            >
              categorie {!transit ? cptCat : cptCatPrevious}
            </div>
            <Question />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Category;
