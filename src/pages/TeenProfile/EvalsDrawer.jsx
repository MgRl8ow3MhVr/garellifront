import { useRef } from "react";
import ProgressCircle from "../../components/ProgressCircle/ProgressCircle";
import { CSSTransition } from "react-transition-group";

const EvalsDrawer = ({ catsAdvance, openDrawer }) => {
  const nodeRef = useRef(null);

  const line1Cats = catsAdvance.slice(0, 3);
  const line2Cats = catsAdvance.slice(3, 7);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={openDrawer}
      timeout={600}
      classNames="drawer"
      unmountOnExit
    >
      <div ref={nodeRef}>
        <div className="catLineContainer">
          {line1Cats.map((cat, j) => (
            <ProgressCircle
              key={j}
              percentage={cat.percent}
              imgUrl={cat.icon}
              size={35}
              position={j}
              colourIn="#ffe3c2"
            />
          ))}
        </div>
        <div className="catLineContainer">
          {line2Cats.map((cat, j) => (
            <ProgressCircle
              key={j}
              percentage={cat.percent}
              imgUrl={cat.icon}
              size={35}
              position={j}
              colourIn="#ffe3c2"
            />
          ))}
        </div>
      </div>
    </CSSTransition>
  );
};

export default EvalsDrawer;
