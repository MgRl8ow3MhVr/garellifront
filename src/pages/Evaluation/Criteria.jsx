import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Criteria.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "../../components/Button/Button";
import { appStore } from "../../store/store";
import LoadingWheel from "../../components/LoadingWheel/LoadingWheel";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const Criterion = ({ inparam, node, criterion, moveDir, changeCrit }) => {
  const apiAnswer = appStore((state) => state.apiAnswer);
  const [loading, setLoading] = useState(null);

  if (!criterion) {
    return null;
  }

  const answerIndex =
    criterion?.answer === "na" ? 0 : Number(criterion?.answer) + 1 || null;
  return (
    <CSSTransition
      nodeRef={node}
      in={inparam}
      timeout={500}
      classNames={`go-${moveDir}`}
      unmountOnExit
    >
      <div className="CriterionBox" ref={node}>
        <div
          className="CriterionText"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay={0}
        >
          {criterion.icon?.url && <img src={criterion.icon?.url} />}
          {criterion.name}
        </div>
        <div
          className="answers"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay={0}
        >
          {Array(criterion.scale + 1)
            .fill("")
            .map((e, i) => {
              return (
                <div key={i}>
                  <div
                    className="answerBubble"
                    onClick={async () => {
                      if (answerIndex !== i) {
                        setLoading(i);
                        const resp = await apiAnswer(i === 0 ? "na" : i - 1);
                        setLoading(null);
                        setTimeout(() => {
                          changeCrit(1);
                        }, 400);
                      }
                    }}
                  >
                    {i === 0 && answerIndex !== 0 && "NE"}
                    {i === answerIndex && (
                      <div className="answered appearAnim">
                        {answerIndex === 0 && "NE"}
                      </div>
                    )}
                    {i === loading && <LoadingWheel />}
                  </div>
                  {i !== criterion.scale && (
                    <div className="answerSeparator"></div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </CSSTransition>
  );
};

function Criteria({ criteria }) {
  const [transit, setTransit] = useState(true);
  const [moveDir, setMoveDir] = useState("right");
  const { critIndex, critPrev } = appStore((state) => state.currentIndexes);
  const changeCritIndex = appStore((state) => state.changeCritIndex);

  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  console.log("criteria", criteria);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    // looking for the last answered and go there
    let latestAnswerPos = 0;
    criteria.forEach((c, i) => {
      if (c.answer || c.answer === 0) {
        latestAnswerPos = i;
      }
    });
    changeCritIndex(latestAnswerPos);
  }, []);

  const changeCrit = (i) => {
    if (critIndex + i < criteria.length) {
      setMoveDir(i > 0 ? "right" : "left");
      setTransit(!transit);
      changeCritIndex(critIndex + i);
    }
  };

  if (!criteria || !criteria.length) {
    return null;
  }
  const index1 = transit ? critIndex : critPrev;
  const index2 = !transit ? critIndex : critPrev;

  return (
    <div className="CriteriaContainer">
      <Criterion
        node={nodeRef}
        inparam={transit}
        moveDir={moveDir}
        criterion={criteria[index1]}
        changeCrit={changeCrit}
      />
      <Criterion
        node={nodeRef2}
        inparam={!transit}
        moveDir={moveDir}
        criterion={criteria[index2]}
        changeCrit={changeCrit}
      />
      <div className="bottomBar">
        <Button
          text="< Précédent"
          action={() => {
            changeCrit(-1);
          }}
          disabled={critIndex === 0}
        />
        <ProgressBar />
        <Button
          text="Passer >"
          action={() => {
            changeCrit(+1);
          }}
          disabled={critIndex === criteria.length - 1}
        />
      </div>
    </div>
  );
}

export default Criteria;
