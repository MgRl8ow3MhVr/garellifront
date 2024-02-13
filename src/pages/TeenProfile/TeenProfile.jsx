import "./TeenProfile.css";
import { appStore } from "../../store/store";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import urlC1 from "../../assets/icons/Cat_Admin.png";
import urlC2 from "../../assets/icons/Cat_Autonomie.png";
import urlC3 from "../../assets/icons/Cat_Education.png";
import urlC4 from "../../assets/icons/Cat_Hygiene.png";
import EvalsDrawer from "./EvalsDrawer";

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
  const apiFetchTimes = appStore((state) => state.apiFetchTimes);
  const teenId = useLocation().state.teenId;
  const teen = appStore((state) => state.teen);
  const user = appStore((state) => state.user.username);
  const evalTimes = appStore((state) => state.evalTimes);
  const [openDrawer, setOpenDrawer] = useState(null);

  console.log("teen", teen);
  console.log("evalTimes", evalTimes);
  useEffect(() => {
    const fetchOneTeen = async () => {
      await apiFetchOneTeen(teenId);
    };
    const fetchTimes = async () => {
      await apiFetchTimes();
    };
    if (teenId) {
      fetchOneTeen();
    }
    if (!evalTimes) {
      fetchTimes();
    }
  }, []);

  // check the times not yet started :
  let evalsNotStarted = [];
  if (evalTimes && teen.evaluations) {
    evalsNotStarted = evalTimes.filter(
      (ev) =>
        !teen.evaluations
          .map((e) => e.attributes.evaluation_time.data.id)
          .includes(ev.id)
    );
  }

  // charger les answers dans le store lorqu'on clique dessus
  // store : current Eval
  if (!teen) return null;
  return (
    <div className="teenContainer">
      <div className="teenBlockTeen">
        <div className="teenInfos">
          <p>
            Nom : <span>{teen.last_name}</span>
          </p>
          <p>
            Prénom : <span>{teen.first_name}</span>
          </p>
          <p>
            Date de naissance : <span>{teen.birth_date}</span>
          </p>
          <p>
            Date d'admission : <span>{teen.birth_date}</span>
          </p>
          <p>
            Educateur référent : <span>{user}</span>
          </p>
          <p>
            Date de sortie : <span>{teen.last_name}</span>
          </p>
        </div>
      </div>
      <div className="teenBlockEvals">
        <div className="teenEvalsTitle">grille d'observation</div>
        {teen.evaluations &&
          teen.evaluations.map((ev, i) => {
            return (
              <div className="teenEvalsContainer" key={i}>
                <div
                  className="teenEvalsTime clickableup"
                  key={i}
                  onClick={() => {
                    setOpenDrawer(i);
                  }}
                >
                  {ev.attributes.evaluation_time.data.attributes.name}
                </div>
                <EvalsDrawer
                  catsAdvance={catsAdvance}
                  openDrawer={openDrawer === i}
                />
              </div>
            );
          })}
        {evalsNotStarted.map((ev, i) => {
          return (
            <div className="teenEvalsContainer" key={i}>
              <div className="teenEvalsTime clickableup notselected" key={i}>
                {ev.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeenProfile;
