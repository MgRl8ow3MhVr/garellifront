import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Category.css";
import Question from "./Question";
import AOS from "aos";
import "aos/dist/aos.css";
import CatSelector from "../../components/CatSelector/CatSelector";

function Category({ currentEval }) {
  const [transit, setTransit] = useState(true);
  const [moveDir, setMoveDir] = useState("right");
  const [currentCatIndex, setCurrentCatIndex] = useState(0);
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  const prev = useRef(0);

  useEffect(() => {
    prev.current = currentCatIndex;
  }, [currentCatIndex]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const changeCat = (i) => {
    if (i !== currentCatIndex) {
      setMoveDir(i > currentCatIndex ? "up" : "down");
      setCurrentCatIndex(i);
      setTransit(!transit);
    }
  };

  return (
    <div className="CategoryContainer">
      <CatSelector changeCat={changeCat} currentCatIndex={currentCatIndex} />
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
          // style={{
          //   backgroundColor: transit ? colors[currentCatIndex] : colors[prev],
          // }}
        >
          <div>
            <div
              className="CategoryText"
              data-aos="fade-down"
              data-aos-duration="800"
              // data-aos-delay={500}
            >
              {transit
                ? currentEval[currentCatIndex].name
                : currentEval[prev.current].name}
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
          // style={{
          //   backgroundColor: !transit ? colors[currentCatIndex] : colors[prev],
          // }}
        >
          <div>
            <div
              className="CategoryText"
              data-aos="fade-down"
              data-aos-duration="800"
            >
              {!transit
                ? currentEval[currentCatIndex].name
                : currentEval[prev.current].name}
            </div>
            <Question />
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Category;
