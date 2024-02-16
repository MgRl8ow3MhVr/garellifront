import "./Evaluation.css";
import Category from "./Category";
import { appStore } from "../../store/store";

const Evaluation = () => {
  const currentEval = appStore((state) => state.currentEval);

  if (!currentEval) {
    return <div>NO CURRENT EVAL</div>;
  }

  return (
    <div className="evaluationContainer">
      <Category currentEval={currentEval} />
    </div>
  );
};

export default Evaluation;
