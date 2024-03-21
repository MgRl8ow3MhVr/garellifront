import ProgressCircle from "../../components/ProgressCircle/ProgressCircle";
import { CSSTransition } from "react-transition-group";
import { appStore } from "../../store/store";

const EvalsDrawer = ({ progression, openDrawer, evalId }) => {
  const line1Cats = progression.slice(0, 4);
  const line2Cats = progression.slice(4, 8);

  const apiFetchEval = appStore((state) => state.apiFetchEval);

  return (
    <CSSTransition
      in={openDrawer}
      timeout={600}
      classNames="drawer"
      unmountOnExit
    >
      <div>
        <div className="catLine1Container">
          {line1Cats.map((cat, j) => (
            <ProgressCircle
              key={j}
              percentage={cat.percent}
              imgUrl={cat.url}
              size={35}
              position={j}
              action={() => {
                apiFetchEval(evalId, j);
              }}
            />
          ))}
          <div className="catLineshift"></div>
        </div>
        <div className="catLine2Container">
          <div className="catLineshift"></div>

          {line2Cats.map((cat, j) => (
            <ProgressCircle
              key={j}
              percentage={cat.percent}
              imgUrl={cat.url}
              size={35}
              position={j}
              action={() => {
                apiFetchEval(evalId, j + 4);
              }}
            />
          ))}
        </div>
      </div>
    </CSSTransition>
  );
};

export default EvalsDrawer;
