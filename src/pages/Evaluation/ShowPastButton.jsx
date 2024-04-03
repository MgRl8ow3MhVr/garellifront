import TimeIcon from "../../assets/icons/Time";
import { colors } from "../../config";
import { appStore } from "../../store/store";
import { CSSTransition } from "react-transition-group";

const ShowPastButton = () => {
  const apiFetchPastEvals = appStore((state) => state.apiFetchPastEvals);
  const pastEvals = appStore((state) => state.pastEvals);
  const togglePastEvals = appStore((state) => state.togglePastEvals);
  const showPastEvals = appStore((state) => state.showPastEvals);
  const currentEvalTime = appStore((state) => state.currentEval).months;

  if (!currentEvalTime) return null;

  return (
    <CSSTransition in={showPastEvals} timeout={300} classNames="timeButton">
      <div
        className="showPastButton"
        onClick={async () => {
          if (!pastEvals) {
            await apiFetchPastEvals();
          }
          togglePastEvals();
        }}
      >
        <TimeIcon
          size="3rem"
          color={!showPastEvals ? colors.button : colors.typo}
        />
      </div>
    </CSSTransition>
  );
};

export default ShowPastButton;
