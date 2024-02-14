import "./TeenProfile.css";
import { appStore } from "../../store/store";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import EvalsDrawer from "./EvalsDrawer";

const TeenProfile = () => {
  const apiFetchOneTeen = appStore((state) => state.apiFetchOneTeen);
  const apiFetchTimes = appStore((state) => state.apiFetchTimes);
  const apiCreateEval = appStore((state) => state.apiCreateEval);
  const teenId = useLocation().state.teenId;
  const teen = appStore((state) => state.teen);
  const user = appStore((state) => state.user);
  const currentEval = appStore((state) => state.currentEval);
  const evalTimes = appStore((state) => state.evalTimes);
  const [openDrawer, setOpenDrawer] = useState(null);

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
  if (evalTimes && teen && teen.evaluations) {
    evalsNotStarted = evalTimes.filter(
      (ev) =>
        !teen.evaluations
          .map((e) => e.attributes.evaluation_time.data.id)
          .includes(ev.id)
    );
  }
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
            Educateur référent : <span>{user.username}</span>
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
                    setOpenDrawer(openDrawer !== i ? i : null);
                  }}
                >
                  {ev.attributes?.evaluation_time.data?.attributes.name}
                  <button>continue</button>
                </div>
                <EvalsDrawer
                  progression={ev.attributes?.progression}
                  openDrawer={openDrawer === i}
                />
              </div>
            );
          })}
        {evalsNotStarted.map((ev, i) => {
          return (
            <div className="teenEvalsContainer" key={i}>
              <div className="teenEvalsTime notselected" key={i}>
                {ev.name}
                <button
                  onClick={() => {
                    apiCreateEval(ev.id);
                  }}
                >
                  start
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeenProfile;
