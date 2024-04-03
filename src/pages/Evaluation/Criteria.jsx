import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Criteria.css";
import "aos/dist/aos.css";
import Button from "../../components/Button/Button";
import { appStore } from "../../store/store";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import AnswerBubbles from "../../components/AnswerBubbles/AnswerBubbles";
import PastAnswers from "./PastAnswers";

const Criterion = ({ inparam, node, criterion, moveDir, changeCrit }) => {
  if (!criterion) {
    return null;
  }

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
          data-aos={`fade-${moveDir}`}
          data-aos-duration="800"
          data-aos-delay={0}
        >
          {criterion.icon?.url && <img src={criterion.icon?.url} />}
          {criterion.name}
        </div>
        <PastAnswers id={criterion.id} />

        <div
          className="answers"
          data-aos={`fade-${moveDir}`}
          data-aos-duration="600"
          data-aos-delay={100}
        >
          <AnswerBubbles criterion={criterion} changeCrit={changeCrit} />
        </div>
      </div>
    </CSSTransition>
  );
};

function Criteria({ criteria, changeCat }) {
  const [transit, setTransit] = useState(true);
  const [moveDir, setMoveDir] = useState("right");
  const { critIndex, critPrev, catIndex } = appStore(
    (state) => state.currentIndexes
  );
  const { lastCat } = appStore((state) => state.currentEval);
  const changeCritIndex = appStore((state) => state.changeCritIndex);

  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  useEffect(() => {
    // looking for the first non answered and go there
    const latestAnswerPos = criteria.findIndex((crit) => !crit.answer);
    // if all is answered, it will return -1 so place it to 0
    changeCritIndex(latestAnswerPos !== -1 ? latestAnswerPos : 0);
  }, []);

  const changeCrit = (i) => {
    if (critIndex + i < criteria.length) {
      setMoveDir(i > 0 ? "right" : "left");
      setTransit(!transit);
      changeCritIndex(critIndex + i);
    }
  };

  if (!criteria || !criteria.length) {
    return null;
  }
  const index1 = transit ? critIndex : critPrev;
  const index2 = !transit ? critIndex : critPrev;
  const lastCriteria = critIndex === criteria.length - 1;

  return (
    <div className="CriteriaContainer">
      <Criterion
        node={nodeRef}
        inparam={transit}
        moveDir={moveDir}
        criterion={criteria[index1]}
        changeCrit={changeCrit}
      />
      <Criterion
        node={nodeRef2}
        inparam={!transit}
        moveDir={moveDir}
        criterion={criteria[index2]}
        changeCrit={changeCrit}
      />
      <div className="bottomBar">
        <Button
          text="< Précédent"
          action={() => {
            changeCrit(-1);
          }}
          disabled={critIndex === 0}
        />
        <ProgressBar />
        <Button
          text={!lastCriteria ? "Passer >" : "Cat. Suiv."}
          action={() => {
            if (!lastCriteria) {
              changeCrit(+1);
            } else {
              changeCat(catIndex + 1);
            }
          }}
          disabled={lastCriteria && catIndex === lastCat}
        />
      </div>
    </div>
  );
}

export default Criteria;
