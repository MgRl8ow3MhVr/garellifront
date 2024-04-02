import TimeIcon from "../../assets/icons/Time";
import { colors } from "../../config";
import { appStore } from "../../store/store";
import { CSSTransition } from "react-transition-group";

const ShowPastButton = () => {
  const apiFetchPastEvals = appStore((state) => state.apiFetchPastEvals);
  const pastEvals = appStore((state) => state.pastEvals);
  const togglePastEvals = appStore((state) => state.togglePastEvals);
  const showPastEvals = appStore((state) => state.showPastEvals);

  return (
    <CSSTransition in={showPastEvals} timeout={300} classNames="timeButton">
      <div
        className="showPastButton"
        onClick={() => {
          if (!pastEvals) {
            apiFetchPastEvals();
          }
          togglePastEvals();
        }}
      >
        <TimeIcon size="3rem" color={colors.typo} />
      </div>
    </CSSTransition>
  );
};

export default ShowPastButton;
