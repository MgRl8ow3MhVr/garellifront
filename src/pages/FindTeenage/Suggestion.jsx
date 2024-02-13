import { useRef, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

const Suggestion = ({ s, i, exit }) => {
  const nodeRef = useRef(null);
  const [enter, setEnter] = useState(false);
  const navigate = useNavigate();

  // const apiFetchTeenages = appStore((state) => state.apiFetchTeenages);

  useEffect(() => {
    setTimeout(() => {
      setEnter(true);
    }, (i + 1) * 75);
  }, []);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={exit ? false : enter}
      timeout={250}
      classNames="suggestion"
      unmountOnExit
    >
      <div
        className="findTeenSuggestion"
        ref={nodeRef}
        onClick={() => {
          navigate("/profil", { state: { teenId: s.id } });
        }}
      >
        <span>{s.first_name}</span>
        <span>{s.last_name}</span>
        <span className="findTeenDate">{s.birth_date}</span>
      </div>
    </CSSTransition>
  );
};

export default Suggestion;
