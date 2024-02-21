import "./Menu.css";
import { useState } from "react";
import { appStore } from "../../store/store";
import { useNavigate, useLocation } from "react-router-dom";
import { colors } from "../../config";
import LogOut from "../../assets/icons/logout.svg";

const MenuPopUp = () => {
  const [open, setOpen] = useState(false);
  const disconnect = appStore((state) => state.disconnect);
  const resetCurrentEval = appStore((state) => state.resetCurrentEval);
  const teen = appStore((state) => state.teen);
  const resetTeen = appStore((state) => state.resetTeen);
  const navigate = useNavigate();
  const location = useLocation();
  const loc = location.pathname;

  const svgMenu = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3rem"
      height="3rem"
      // width="120.34"
      // height="97.56"
      viewBox="0 0 120.34 97.56"
      fill={loc !== "/profil" ? colors.typo : colors.background1}
    >
      <path
        id="Menu"
        d="M3496.42,4411.22h103.5a8.425,8.425,0,0,1,0,16.85h-103.5A8.425,8.425,0,0,1,3496.42,4411.22Zm0,40.36h103.5a8.42,8.42,0,0,1,0,16.84h-103.5A8.42,8.42,0,0,1,3496.42,4451.58Zm0,40.35h103.5a8.425,8.425,0,0,1,0,16.85h-103.5A8.425,8.425,0,0,1,3496.42,4491.93Z"
        transform="translate(-3488 -4411.22)"
      />
    </svg>
  );

  return (
    <>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="menuIcon"
      >
        {loc !== "/" ? svgMenu : <img src={LogOut} />}
      </div>
      {open && (
        <div className="menuContainer appearAnim">
          <div className="menuOption" onClick={disconnect}>
            disconnect
          </div>
          {loc !== "/" && (
            <div
              className="menuOption"
              onClick={() => {
                navigate("/");
                resetCurrentEval();
                resetTeen();
                setOpen(false);
              }}
            >
              recherche
            </div>
          )}
          {loc === "/evaluation" && (
            <div
              className="menuOption"
              onClick={() => {
                resetCurrentEval();
                navigate("/profil", { state: { teenId: teen.id } });
                setOpen(false);
              }}
            >
              profil
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MenuPopUp;
