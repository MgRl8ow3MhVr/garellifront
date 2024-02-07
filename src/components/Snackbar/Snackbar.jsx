import "./Snackbar.css";
import { CSSTransition } from "react-transition-group";
import { useRef, useEffect, useState } from "react";
import { appStore } from "../../store/store";
import { snackbartime } from "../../config";

const Snackbar = () => {
  const nodeRef = useRef(null);
  const { on, text } = appStore((state) => state.snackbar);
  const resetSnackbar = appStore((state) => state.resetSnackbar);

  useEffect(() => {
    if (on) {
      setTimeout(() => {
        resetSnackbar();
      }, snackbartime);
    }
  }, [on]);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={on}
      timeout={500}
      classNames="snack"
      unmountOnExit
    >
      <div ref={nodeRef} className="snackbar">
        {text}
      </div>
    </CSSTransition>
  );
};
export default Snackbar;
