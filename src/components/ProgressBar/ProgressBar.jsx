import "./ProgressBar.css";
import { appStore } from "../../store/store";
import { colors } from "../../config";

const ProgressBar = () => {
  const { critIndex, catIndex } = appStore((state) => state.currentIndexes);
  const { answers } = appStore((state) => state.currentEval);
  const criteria = answers[catIndex].criteria;
  const max = criteria.length;

  const mycolor = (i) => {
    if (i === critIndex) {
      return colors.inprogress;
    } else if (criteria[i].answer) {
      return colors.done;
    } else {
      return colors.grey2;
    }
  };

  return (
    <div className="progressContainer">
      <div className="progressNums">
        {critIndex + 1}/{max}
      </div>
      {criteria.map((crit, i) => (
        <div
          key={i}
          className={`progressItem ${i === 0 && "first"} ${
            i === max - 1 && "last"
          }`}
          style={{ backgroundColor: mycolor(i) }}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
