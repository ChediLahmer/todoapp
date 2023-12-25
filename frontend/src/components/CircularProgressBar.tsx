import React, { useRef, useEffect } from "react";

interface CircularProgressbarProps {
  percentage: number;
}

const CircularProgressbar: React.FC<CircularProgressbarProps> = ({
  percentage,
}) => {
  const sqSize = 24;
  const radius = (sqSize - 2) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  const circleRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.transition = "stroke-dashoffset 0.3s ease-in-out";
      circleRef.current.style.strokeDashoffset = dashOffset.toString();
    }
  }, [dashOffset]);

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth="2"
        fill="none"
        stroke="#ddd" 
      />
      <circle
        ref={circleRef}
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth="2"
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        fill="none"
        stroke="purple" 
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashArray, 
        }}
      />
    </svg>
  );
};

export default CircularProgressbar;
