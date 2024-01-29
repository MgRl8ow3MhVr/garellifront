import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Question.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Question({}) {
  const [transit, setTransit] = useState(true);
  const [moveDir, setMoveDir] = useState("right");
  const [cptQ, setCptQ] = useState(0);
  const [cptQPrevious, setCptQPrevious] = useState(cptQ);
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  const colors = ["#585b4c", "#826d62", "#c89f9c", "#ca7c5c"];

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="QuestionContainer">
      <button
        className="buttonNext"
        onClick={() => {
          setMoveDir("left");
          setCptQ(cptQ - 1);
          setCptQPrevious(cptQ);
          setTransit(!transit);
        }}
      >
        {`< PREV`}
      </button>

      <button
        className="buttonPrev"
        onClick={() => {
          setMoveDir("right");
          setCptQ(cptQ + 1);
          setCptQPrevious(cptQ);
          setTransit(!transit);
        }}
      >
        {`NEXT >`}
      </button>

      <CSSTransition
        nodeRef={nodeRef}
        in={transit}
        timeout={500}
        classNames={`go-${moveDir}`}
        unmountOnExit
      >
        <div
          className="QuestionBox"
          ref={nodeRef}
          style={{
            backgroundColor: transit ? colors[cptQ] : colors[cptQPrevious],
          }}
        >
          <div>
            <div
              className="QuestionText"
              // data-aos="fade-down"
              // data-aos-duration="800"
              // data-aos-delay={500}
            >
              question {transit ? cptQ : cptQPrevious}
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
          className="QuestionBox"
          ref={nodeRef2}
          style={{
            backgroundColor: !transit ? colors[cptQ] : colors[cptQPrevious],
          }}
        >
          <div>
            <div
              className="QuestionText"
              // data-aos="fade-down"
              // data-aos-duration="800"
            >
              question {!transit ? cptQ : cptQPrevious}
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Question;
