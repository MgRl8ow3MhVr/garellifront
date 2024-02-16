import "./CatSelector.css";
import { appStore } from "../../store/store";

const CatSelector = ({ changeCat, currentCatIndex }) => {
  const categories = appStore((state) => state.categories);

  return (
    <div className="selectorContainer">
      {categories &&
        categories.map((c, i) => (
          <div
            className={i !== currentCatIndex ? "selectorIcon" : "selectedIcon"}
            onClick={() => {
              changeCat(i);
            }}
          >
            <img src={c.url} />
          </div>
        ))}
    </div>
  );
};

export default CatSelector;
