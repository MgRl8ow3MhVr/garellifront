import "./Menu.css";
import { useState, useRef } from "react";
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

  return (
    <>
      <div className="menuContainer">
        <div>
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="menuIcon"
          >
            <MenuIcon color={colorFill} size="3rem" />
          </div>
        </div>
        <CSSTransition
          nodeRef={nodeRef}
          in={open}
          timeout={500}
          classNames="menu"
          unmountOnExit
        >
          <div ref={nodeRef}>
            {/* {open && ( */}
            <div className="menuIcon" onClick={disconnect}>
              <LogoutIcon color={colorFill} size="3rem" />
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
                <ResearchIcon color={colorFill} size="3rem" />
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
                <UserIcon color={colorFill} size="3rem" />
              </div>
            )}
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default MenuPopUp;
