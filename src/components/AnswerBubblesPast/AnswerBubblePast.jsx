import "./AnswerBubblePast.css";

const AnswerBubblePast = ({ criterion }) => {
  const answerIndex = Number(criterion?.answer);

  return (
    <>
      {Array(criterion.scale + 1)
        .fill("")
        .map((e, i) => {
          return (
            <div key={i}>
              <div
                className={`answerPastBubble ${
                  i === answerIndex && "answeredPast"
                }`}
              ></div>
              {i !== criterion.scale && (
                <div className="answerPastSeparator"></div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default AnswerBubblePast;
