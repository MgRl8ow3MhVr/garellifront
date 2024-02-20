import { CSSTransition } from "react-transition-group";
import { useState, useRef, useEffect } from "react";
import "./Category.css";
import Criteria from "./Criteria";
import AOS from "aos";
import "aos/dist/aos.css";
import CatSelector from "../../components/CatSelector/CatSelector";
import { appStore } from "../../store/store";
import { useNavigate } from "react-router-dom";

const CategoryComponent = ({ inparam, node, category, moveDir, changeCat }) => {
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
          data-aos={`fade-${moveDir}`}
          data-aos-duration="800"
          data-aos-delay={150}
          data-aos-easing="ease-out-cubic"
        >
          <img src={category?.icon?.url} />
          {category.name}
        </div>
        <Criteria criteria={category.criteria} changeCat={changeCat} />
      </div>
    </CSSTransition>
  );
};
const Category = () => {
  const [transit, setTransit] = useState(true);
  const [moveDir, setMoveDir] = useState("right");
  const nodeRef = useRef(null);
  const nodeRef2 = useRef(null);
  const navigate = useNavigate();

  const { answers } = appStore((state) => state.currentEval);

  const { catIndex, catPrev } = appStore((state) => state.currentIndexes);
  const changeCatIndex = appStore((state) => state.changeCatIndex);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    // in case we reload browser
    if (!answers) {
      navigate("/");
    }
  }, []);

  const changeCat = (i) => {
    if (i !== catIndex) {
      changeCatIndex(i);
      setMoveDir(i > catIndex ? "down" : "up");
      setTransit(!transit);
    }
  };

  if (!answers) {
    return null;
  }

  return (
    <div className="CategoryContainer">
      <CatSelector changeCat={changeCat} catIndex={catIndex} />
      <CategoryComponent
        inparam={transit}
        node={nodeRef}
        category={answers[transit ? catIndex : catPrev]}
        moveDir={moveDir}
        changeCat={changeCat}
      />
      <CategoryComponent
        inparam={!transit}
        node={nodeRef2}
        category={answers[!transit ? catIndex : catPrev]}
        moveDir={moveDir}
        changeCat={changeCat}
      />
    </div>
  );
};

export default Category;
