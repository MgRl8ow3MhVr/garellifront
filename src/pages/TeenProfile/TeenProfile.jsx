import "./TeenProfile.css";
import { appStore } from "../../store/store";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import urlC1 from "../../assets/icons/Cat_Admin.png";
import urlC2 from "../../assets/icons/Cat_Autonomie.png";
import urlC3 from "../../assets/icons/Cat_Education.png";
import urlC4 from "../../assets/icons/Cat_Hygiene.png";
import ProgressCircle from "../../components/ProgressCircle/ProgressCircle";

const catsAdvance = [
  { percent: "90", icon: urlC1 },
  { percent: "80", icon: urlC2 },
  { percent: "70", icon: urlC3 },
  { percent: "60", icon: urlC4 },
  { percent: "50", icon: urlC1 },
  { percent: "30", icon: urlC2 },
  { percent: "10", icon: urlC3 },
];

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
  if (!teen) return null;
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
          teen.evaluations.map((ev, i) => {
            return (
              <div className="teenEvalsContainer">
                <div className="teenEvalsTime" key={i}>
                  {ev.attributes.evaluation_time.data.attributes.name}
                </div>
                <div className="teenEvalsDrawer">
                  {catsAdvance.map((cat) => (
                    <div className="catContainer">
                      <ProgressCircle
                        percentage={cat.percent}
                        imgUrl={cat.icon}
                        size={35}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TeenProfile;
