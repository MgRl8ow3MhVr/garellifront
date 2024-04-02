import "./PastAnswers.css";
import { CSSTransition } from "react-transition-group";
import { appStore } from "../../store/store";

const PastAnswers = ({ id }) => {
  const showPastEvals = appStore((state) => state.showPastEvals);
  const pastEvals = appStore((state) => state.pastEvals);

  console.log("thepast evals", pastEvals);

  console.log("id", id);
  return (
    <CSSTransition
      in={showPastEvals}
      timeout={600}
      classNames="PA"
      unmountOnExit
    >
      <div className="pastAnswersContainer">
        past <br /> past
      </div>
    </CSSTransition>
  );
};

export default PastAnswers;
