import "./TeenProfile.css";
import ThumbUp from "../../assets/icons/thumbUp.svg";
import Power from "../../assets/icons/power.svg";

import { appStore } from "../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EvalsDrawer from "./EvalsDrawer";

const TeenProfile = () => {
  const apiFetchOneTeen = appStore((state) => state.apiFetchOneTeen);
  const apiFetchTimes = appStore((state) => state.apiFetchTimes);
  const apiCreateEval = appStore((state) => state.apiCreateEval);
  // const apiFetchEval = appStore((state) => state.apiFetchEval);
  const teenId = useLocation()?.state?.teenId;
  const teen = appStore((state) => state.teen);
  const currentEval = appStore((state) => state.currentEval);
  const user = appStore((state) => state.user);
  const evalTimes = appStore((state) => state.evalTimes);
  const [openDrawer, setOpenDrawer] = useState(null);

  const navigate = useNavigate();
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

  // This will handle the navigation to evaluation page in two cases : eval creation, or eval selection
  useEffect(() => {
    if (currentEval.answers) {
      navigate("/evaluation");
    }
  }, [currentEval]);

  // check the eval_times not yet started :
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
        <div className="photoBlock">
          <div className="photoContainer">
            {teen.photo && <img src={teen.photo} />}
          </div>
        </div>
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
        <div className="evalsBlock">
          {teen.evaluations &&
            teen.evaluations.map((ev, i) => {
              return (
                <div className="teenEvalsContainer" key={i}>
                  <div className="teenEvalsTime" key={i}>
                    <div
                      className="hoveryellow"
                      onClick={() => {
                        setOpenDrawer(openDrawer !== i ? i : null);
                      }}
                    >
                      {ev.attributes?.evaluation_time.data?.attributes.name}
                    </div>
                    <div
                      className="teenEvalsAction hoverbig"
                      onClick={() => {
                        console.log("clic");
                      }}
                    >
                      <img src={ThumbUp} />
                    </div>
                  </div>
                  <EvalsDrawer
                    progression={ev.attributes?.progression}
                    openDrawer={openDrawer === i}
                    evalId={ev.id}
                  />
                </div>
              );
            })}
          {evalsNotStarted.map((ev, i) => {
            return (
              <div className="teenEvalsContainer" key={i}>
                <div className="teenEvalsTime notselected" key={i}>
                  <div> {ev.name}</div>
                  <div
                    className="teenEvalsAction hoverbig"
                    onClick={() => {
                      apiCreateEval(ev.id);
                    }}
                  >
                    <img src={Power} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeenProfile;
