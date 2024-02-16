import "./Button.css";

const Button = ({ text, disabled, action }) => {
  return (
    <button
      onClick={() => {
        if (!disabled) {
          action();
        }
      }}
      className={disabled ? "buttondisabled" : "button"}
    >
      {text}
    </button>
  );
};

export default Button;
