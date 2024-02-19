import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Category.css";
import Criteria from "./Criteria";
import AOS from "aos";
import "aos/dist/aos.css";
import CatSelector from "../../components/CatSelector/CatSelector";
import { appStore } from "../../store/store";

const CategoryComponent = ({ inparam, node, category, moveDir }) => {
  return (
    <CSSTransition
      nodeRef={node}
      in={inparam}
      timeout={500}
      classNames={`go-${moveDir}`}
      unmountOnExit
    >
      <div className="CategoryBox" ref={node}>
        <div
          className="CategoryTitle"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <img src={category?.icon?.url} />
          {category.name}
        </div>
        <Criteria criteria={category.criteria} />
      </div>
    </CSSTransition>
  );
};
const Category = () => {
  const [transit, setTransit] = useState(true);
  const [moveDir, setMoveDir] = useState("right");
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);

  const { answers } = appStore((state) => state.currentEval);

  const { catIndex, catPrev } = appStore((state) => state.currentIndexes);
  const changeCatIndex = appStore((state) => state.changeCatIndex);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const changeCat = (i) => {
    if (i !== catIndex) {
      changeCatIndex(i);
      setMoveDir(i > catIndex ? "down" : "up");
      setTransit(!transit);
    }
  };

  if (!answers) {
    return <div>Evaluation manquante</div>;
  }

  return (
    <div className="CategoryContainer">
      <CatSelector changeCat={changeCat} catIndex={catIndex} />
      <CategoryComponent
        inparam={transit}
        node={nodeRef}
        category={answers[transit ? catIndex : catPrev]}
        moveDir={moveDir}
      />
      <CategoryComponent
        inparam={!transit}
        node={nodeRef2}
        category={answers[!transit ? catIndex : catPrev]}
        moveDir={moveDir}
      />
    </div>
  );
};

export default Category;
