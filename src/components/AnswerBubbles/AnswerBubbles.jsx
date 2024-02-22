import LoadingWheel from "../LoadingWheel/LoadingWheel";
import { useState } from "react";
import { appStore } from "../../store/store";
import "./AnswerBubbles.css";

const AnswerBubbles = ({ criterion, changeCrit }) => {
  const [loading, setLoading] = useState(null);
  const apiAnswer = appStore((state) => state.apiAnswer);

  const answerIndex =
    criterion?.answer === "na" ? 0 : Number(criterion?.answer) + 1 || null;
  return (
    <>
      {Array(criterion.scale + 2)
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
                {i === 0 && answerIndex !== 0 && loading !== 0 && "NE"}
                {i === answerIndex && (
                  <div className="answered appearAnim">
                    {answerIndex === 0 && "NE"}
                  </div>
                )}
                {i === loading && <LoadingWheel />}
              </div>
              {i !== criterion.scale + 1 && (
                <div className="answerSeparator"></div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default AnswerBubbles;
