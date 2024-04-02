import "./Evaluation.css";
import Category from "./Category";
import ShowPastButton from "./ShowPastButton";

const Evaluation = () => {
  return (
    <div className="evaluationContainer">
      <ShowPastButton />
      <Category />
    </div>
  );
};

export default Evaluation;
