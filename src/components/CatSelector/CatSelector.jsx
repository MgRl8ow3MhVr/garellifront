import "./CatSelector.css";
import { appStore } from "../../store/store";

const CatSelector = ({ changeCat, catIndex }) => {
  const categories = appStore((state) => state.currentEval.categories);
  return (
    <div className="selectorContainer">
      {categories &&
        categories.map((c, i) => (
          <div
            key={i}
            className={i !== catIndex ? "selectorIcon" : "selectedIcon"}
            onClick={() => {
              changeCat(i);
            }}
          >
            <img src={c.url2} />
          </div>
        ))}
    </div>
  );
};

export default CatSelector;
