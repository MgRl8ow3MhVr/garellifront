import "./Menu.css";
import { useState } from "react";
import { appStore } from "../../store/store";

const MenuPopUp = () => {
  const [open, setOpen] = useState(false);
  const disconnect = appStore((state) => state.disconnect);

  return (
    <>
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="menuIcon"
      >
        X
      </div>
      {open && (
        <div className="menuContainer">
          <div onClick={disconnect}>DISCONNECT</div>
          <div>RETOUR HOME</div>
        </div>
      )}
    </>
  );
};

export default MenuPopUp;
