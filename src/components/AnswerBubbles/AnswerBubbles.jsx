import LoadingWheel from "../LoadingWheel/LoadingWheel";
import { useState } from "react";
import { appStore } from "../../store/store";
import "./AnswerBubbles.css";

const AnswerBubbles = ({ criterion, changeCrit }) => {
  const [loading, setLoading] = useState(null);
  const apiAnswer = appStore((state) => state.apiAnswer);
  const answerIndex = Number(criterion?.answer);

  return (
    <>
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
                    const resp = await apiAnswer(i);
                    setLoading(null);
                    setTimeout(() => {
                      changeCrit(1);
                    }, 400);
                  }
                }}
              >
                {i === answerIndex && (
                  <div className="answered appearAnim"></div>
                )}
                {i === loading && <LoadingWheel />}
              </div>
              {i !== criterion.scale && <div className="answerSeparator"></div>}
            </div>
          );
        })}
    </>
  );
};

export default AnswerBubbles;
