import { useRef, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

const Suggestion = ({ s, i }) => {
  const nodeRef = useRef(null);
  // const [enter, setEnter] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setEnter(true);
  //   }, (i + 1) * 200);
  // }, []);
  // if (!enter) {
  //   return null;
  // }
  return (
    <div
      className="findTeenSuggestion"
      ref={nodeRef}
      onClick={() => {
        navigate("/profil", { state: { teenId: s.id } });
      }}
      // data-aos={"fade-down"}
      // data-aos-duration="800"
      // data-aos-delay={i * 50}
      // data-aos-easing="ease-out-cubic"
    >
      {s.photo ? (
        <img src={s.photo} />
      ) : (
        <div className="findTeenEmptyphoto"></div>
      )}
      <span>{s.first_name}</span>
      <span>{s.last_name}</span>
      <span className="findTeenDate">{s.birth_date}</span>
    </div>
  );
};

export default Suggestion;
