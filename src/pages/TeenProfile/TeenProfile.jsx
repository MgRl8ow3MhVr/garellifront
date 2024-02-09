import "./TeenProfile.css";
import { appStore } from "../../store/store";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const TeenProfile = () => {
  const apiFetchOneTeen = appStore((state) => state.apiFetchOneTeen);
  const teenId = useLocation().state.teenId;
  const teen = appStore((state) => state.teen);
  console.log("teen", teen);
  useEffect(() => {
    const fetchOneTeen = async () => {
      await apiFetchOneTeen(teenId);
    };
    if (teenId) {
      fetchOneTeen();
    }
  }, []);

  // CALL EVALUATIONS WHERE TEENAGER = ID
  // ONLY FIELDS WITHOUT ANSWERS FIEDS

  // charger les answers dans le store lorqu'on clique dessus
  // store : current Eval

  return (
    <div className="teenContainer">
      <div className="teenBlockTeen">
        <div className="teenInfos">
          <p>Prénom : {teen.last_name}</p>
          <p>Nom : {teen.first_name}</p>
          <p>Date de naissance : {teen.birth_date}</p>
        </div>
      </div>
      <div className="teenBlockEvals">
        <div className="teenEvalsTitle">grille d'observation</div>
        {teen.evaluations &&
          teen.evaluations.map((eval) => {
            return (
              <div className="teenEvalsTime">{eval.attributes.status}</div>
            );
          })}
      </div>
    </div>
  );
};

export default TeenProfile;
