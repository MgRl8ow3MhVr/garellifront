import "./TeenProfile.css";
import ThumbupGrey from "../../assets/icons/thumbupGrey.svg";
import ThumbupWhite from "../../assets/icons/thumbupWhite.svg";
import ThumbupYellow from "../../assets/icons/thumbupYellow.svg";

import { appStore } from "../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EvalsDrawer from "./EvalsDrawer";
import LoadingWheel from "../../components/LoadingWheel/LoadingWheel";

const TeenProfile = () => {
  const apiFetchOneTeen = appStore((state) => state.apiFetchOneTeen);
  const apiCreateEval = appStore((state) => state.apiCreateEval);
  const apiProduceResults = appStore((state) => state.apiProduceResults);
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
    if (teenId) {
      fetchOneTeen();
    }
  }, []);

  // This will handle the navigation to evaluation page in case of eval selection
  useEffect(() => {
    if (currentEval.answers) {
      navigate("/evaluation");
    }
  }, [currentEval]);

  // check the eval_times not yet started :
  // And exclude the "Exit" one
  let evalsNotStarted = [];

  if (evalTimes && teen && teen.evaluations) {
    evalsNotStarted = evalTimes.filter(
      (ev) =>
        !teen.evaluations
          .map((e) => e.attributes.evaluation_time.data.id)
          .includes(ev.id)
    );
  }

  // teen must have at least two evals created : first and last
  if (!teen || teen.evaluations.length < 2) return <LoadingWheel />;

  // now isolate exit one to put it in the end
  const activeEvals = JSON.parse(JSON.stringify(teen.evaluations));
  // sort by months
  activeEvals.sort(
    (a, b) =>
      a.attributes.evaluation_time.data.attributes.months -
      b.attributes.evaluation_time.data.attributes.months
  );
  const lastEval = activeEvals.pop();
  const allEvals = activeEvals.concat(evalsNotStarted);
  allEvals.push(lastEval);

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
            Date d'admission : <span>{teen.entry_date}</span>
          </p>
          <p>
            Date de sortie : <span>{teen.exit_date}</span>
          </p>
          <p>
            Educateur référent : <span>{user.username}</span>
          </p>
        </div>
      </div>
      <div className="teenBlockEvals">
        <div className="teenEvalsTitle">grille d'observation</div>
        <div className="evalsBlock">
          {allEvals &&
            allEvals.map((ev, i) => {
              // # # # # # # # # # # EVAL NOT STARTED # # # # # # #
              if (!ev.attributes) {
                return (
                  <div className="teenEvalsContainer" key={i}>
                    <div className="teenEvalsTime notselected">
                      <div> {ev.name}</div>
                    </div>
                  </div>
                );
              }

              // # # # # # # # # # # EVAL STARTED # # # # # # #

              const started = ev.attributes.status === "started";
              // complete means not yet validated but all answered 100%
              // const complete = true;
              const complete = ev.attributes.progression.reduce(
                (acc, p) => acc === true && p.percent === 100,
                true
              );
              return (
                <div className="teenEvalsContainer" key={i}>
                  <div className="teenEvalsTime">
                    <div
                      className="hoverright"
                      onClick={() => {
                        setOpenDrawer(openDrawer !== i ? i : null);
                      }}
                    >
                      {ev.attributes?.evaluation_time.data?.attributes.name}
                    </div>
                    {/* STARTED AND COMPLETED */}
                    {started && complete && (
                      <div
                        className="teenEvalsAction hoverbig"
                        onClick={async () => {
                          // mettre un try catch plutot ?
                          await apiProduceResults(ev.id);
                          // unlock next eval
                          const idToStart = evalsNotStarted.length
                            ? evalsNotStarted[0]
                            : null;
                          idToStart && (await apiCreateEval(idToStart));
                        }}
                      >
                        <img src={ThumbupYellow} />
                      </div>
                    )}
                    {/* NOT COMPLETE YET*/}
                    {started && !complete && (
                      <div className="teenEvalsAction">
                        <img src={ThumbupGrey} />
                      </div>
                    )}
                    {/* FINISHED*/}
                    {!started && (
                      <div className="teenEvalsAction">
                        <img src={ThumbupWhite} />
                      </div>
                    )}
                  </div>
                  <EvalsDrawer
                    progression={ev.attributes?.progression}
                    openDrawer={openDrawer === i}
                    evalId={ev.id}
                    evalMonths={
                      ev?.attributes?.evaluation_time?.data?.attributes?.months
                    }
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TeenProfile;
