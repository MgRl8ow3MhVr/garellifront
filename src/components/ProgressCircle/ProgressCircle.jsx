import { useEffect, useState } from "react";
import { bgColor, typoColor } from "../../config";
import "./ProgressCircle.css";

const cleanPercentage = (percentage) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle = ({ colour, pct, size, colourIn }) => {
  const r = size * 0.8;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct) * circ) / 100;
  return (
    <circle
      r={r}
      cx={size}
      cy={size}
      fill="transparent"
      //   fill={colourIn}
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"0.25rem"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

const Text = ({ percentage }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const ProgressCircle = ({
  percentage,
  colourIn = bgColor,
  colour = typoColor,
  size = 50,
  imgUrl,
  imgSize = 0.4,
}) => {
  const [pctState, setPctState] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setPctState(cleanPercentage(percentage));
    }, 100);
  }, []);

  return (
    <div
      className="svgProgressBar"
      style={{ width: 2 * size, height: 2 * size }}
    >
      <svg width={2 * size} height={2 * size}>
        <g transform={`rotate(-90 ${size} ${size})`}>
          {/* <Circle colour="lightgrey" /> */}
          <Circle
            colour={colour}
            colourIn={colourIn}
            pct={pctState}
            size={size}
          />
        </g>
        {/* <Text percentage={pct} /> */}
      </svg>
      <img
        src={imgUrl}
        style={{
          width: 2 * imgSize * size,
          height: 2 * imgSize * size,
        }}
      />
    </div>
  );
};

export default ProgressCircle;
