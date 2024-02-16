import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Criteria.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "../../components/Button/Button";

const Criterion = ({ inparam, node, criterion, moveDir }) => {
  console.log(criterion);
  const answer = 1;
  return (
    <CSSTransition
      nodeRef={node}
      in={inparam}
      timeout={500}
      classNames={`go-${moveDir}`}
      unmountOnExit
    >
      <div className="CriterionBox" ref={node}>
        <div
          className="CriterionText"
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay={0}
        >
          {criterion.name}
        </div>
        <div className="answers">
          {Array(criterion.scale + 1)
            .fill("")
            .map((e, i) => {
              return (
                <>
                  <div className="answerBubble">
                    {i === 0 && "NE"}
                    {i === answer + 1 && <div className="answered"></div>}
                  </div>
                  {i !== criterion.scale && (
                    <div className="answerSeparator"></div>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </CSSTransition>
  );
};

function Criteria({ criteria }) {
  const [transit, setTransit] = useState(true);
  const [moveDir, setMoveDir] = useState("right");
  const [currCritIndex, setCurrCritIndex] = useState(0);
  const prev = useRef(0);

  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  useEffect(() => {
    prev.current = currCritIndex;
  }, [currCritIndex]);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const changeCrit = (i) => {
    setMoveDir(i > 0 ? "right" : "left");
    setCurrCritIndex(currCritIndex + i);
    setTransit(!transit);
  };

  if (!criteria || !criteria.length) {
    return null;
  }

  return (
    <div className="CriteriaContainer">
      <Criterion
        node={nodeRef}
        inparam={transit}
        moveDir={moveDir}
        criterion={criteria[transit ? currCritIndex : prev.current]}
      />
      <Criterion
        node={nodeRef2}
        inparam={!transit}
        moveDir={moveDir}
        criterion={criteria[!transit ? currCritIndex : prev.current]}
      />
      <div className="bottomBar">
        <Button
          text="Précédent"
          action={() => {
            changeCrit(-1);
          }}
          disabled={currCritIndex === 0}
        />
        <Button
          text="Suivant"
          action={() => {
            changeCrit(+1);
          }}
          disabled={currCritIndex === criteria.length - 1}
        />
      </div>
    </div>
  );
}

export default Criteria;
