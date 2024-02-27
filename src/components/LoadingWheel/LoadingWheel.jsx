import "./LoadingWheel.css";
import { colors } from "../../config";

const LoadingWheel = ({ color = colors.button }) => {
  return (
    <span
      className="loader appearAnim"
      style={{ border: `5px solid ${color}`, borderBottomColor: "transparent" }}
    ></span>
  );
};
export default LoadingWheel;
