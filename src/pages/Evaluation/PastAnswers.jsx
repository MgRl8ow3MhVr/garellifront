import "./PastAnswers.css";
import { CSSTransition } from "react-transition-group";
import { appStore } from "../../store/store";
import AnswerBubblePast from "../../components/AnswerBubblesPast/AnswerBubblePast";
import longArrow from "../../assets/icons/longArrow.svg";

const PastAnswers = ({ id }) => {
  const showPastEvals = appStore((state) => state.showPastEvals);
  const pastEvals = appStore((state) => state.pastEvals);
  const catIndex = appStore((state) => state.currentIndexes.catIndex);
  const currentEvalTime = appStore((state) => state.currentEval).months;

  if (!pastEvals) return null;
  return (
    <CSSTransition
      in={showPastEvals}
      timeout={600}
      classNames="PA"
      unmountOnExit
    >
      <div className="pastAnswers2blocks">
        <div className="pastAnswersContainer">
          {pastEvals.map((ev, i) => {
            const criterion = ev.answers[catIndex]?.criteria?.find(
              (a) => a.id === id
            );
            if (!criterion) return null;
            return (
              <div key={i} className="answersPast">
                <AnswerBubblePast criterion={criterion} />
              </div>
            );
          })}
        </div>
        <div className="pastAnswersArrow">
          <span>ARRIVEE</span>
          {currentEvalTime > 6 && <img src={longArrow} />}
        </div>
      </div>
    </CSSTransition>
  );
};

export default PastAnswers;
