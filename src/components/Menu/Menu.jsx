import "./Menu.css";
import { useState, useRef, useEffect } from "react";
import { appStore } from "../../store/store";
import { useNavigate, useLocation } from "react-router-dom";
import { colors } from "../../config";
import LogoutIcon from "../../assets/icons/LogoutIcon";
import UserIcon from "../../assets/icons/UserIcon";
import ResearchIcon from "../../assets/icons/ResearchIcon";
import MenuIcon from "../../assets/icons/MenuIcon";
import { CSSTransition } from "react-transition-group";

const MenuPopUp = () => {
  const [open, setOpen] = useState(false);
  const disconnect = appStore((state) => state.disconnect);
  const resetCurrentEval = appStore((state) => state.resetCurrentEval);
  const teen = appStore((state) => state.teen);
  const resetTeen = appStore((state) => state.resetTeen);
  const navigate = useNavigate();
  const location = useLocation();
  const loc = location.pathname;
  const nodeRef = useRef(null);
  const colorFill = loc === "/profil" ? colors.background1 : colors.typo;

  useEffect(() => {
    console.log("cool");
    setOpen(false);
  }, [loc]);

  return (
    <>
      <div className="menuContainer">
        <div className="burgerContainer">
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="menuIcon"
          >
            <MenuIcon color={colorFill} size={open ? "90%" : "100%"} />
          </div>
        </div>
        <CSSTransition
          nodeRef={nodeRef}
          in={open}
          timeout={500}
          classNames="menu"
          unmountOnExit
        >
          <div className="optionsContainer" ref={nodeRef}>
            {/* {open && ( */}
            <div className="menuIcon" onClick={disconnect}>
              <LogoutIcon color={colorFill} size="100%" />
            </div>
            {/* )} */}
            {loc !== "/" && (
              <div
                className="menuIcon"
                onClick={() => {
                  navigate("/");
                  resetCurrentEval();
                  resetTeen();
                  setOpen(false);
                }}
              >
                <ResearchIcon color={colorFill} size="100%" />
              </div>
            )}
            {loc === "/evaluation" && (
              <div
                className="menuIcon"
                onClick={() => {
                  resetCurrentEval();
                  navigate("/profil", { state: { teenId: teen.id } });
                  setOpen(false);
                }}
              >
                <UserIcon color={colorFill} size="100%" />
              </div>
            )}
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default MenuPopUp;
