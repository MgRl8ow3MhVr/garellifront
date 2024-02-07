import { useRef, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

const Suggestion = ({ s, i, exit }) => {
  const nodeRef = useRef(null);
  const [enter, setEnter] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setEnter(true);
    }, (i + 1) * 75);
  }, []);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      // in={enter}
      in={exit ? false : enter}
      timeout={250}
      classNames="suggestion"
      unmountOnExit
    >
      <div ref={nodeRef}>
        <span>{s.first_name}</span>
        <span>{s.last_name}</span>
        <span className="findTeenDate">{s.birth_date}</span>
      </div>
    </CSSTransition>
  );
};

export default Suggestion;
