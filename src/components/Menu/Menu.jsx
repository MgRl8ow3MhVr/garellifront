import "./Menu.css";
import { useState } from "react";

const MenuPopUp = () => {
  const [open, setOpen] = useState(false);
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
          <div>DISCONNECT</div>
          <div>RETOUR HOME</div>
        </div>
      )}
    </>
  );
};

export default MenuPopUp;
