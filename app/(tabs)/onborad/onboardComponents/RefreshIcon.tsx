import React from "react";
import Svg, { Path } from "react-native-svg";

const RefreshIcon = ({ size = 24, color = "#707085" }) => {
  const width = (13 / 16) * size; 
  return (
    <Svg width={width} height={size} viewBox="0 0 13 16" fill="none">
      <Path
        d="M6.5 2.18182V0L3.25 2.90909L6.5 5.81818V3.63636C9.18937 3.63636 11.375 5.59273 11.375 8C11.375 8.73455 11.1719 9.43273 10.8062 10.0364L11.9925 11.0982C12.6263 10.2036 13 9.14182 13 8C13 4.78545 10.0913 2.18182 6.5 2.18182ZM6.5 12.3636C3.81063 12.3636 1.625 10.4073 1.625 8C1.625 7.26545 1.82812 6.56727 2.19375 5.96364L1.0075 4.90182C0.37375 5.79636 0 6.85818 0 8C0 11.2145 2.90875 13.8182 6.5 13.8182V16L9.75 13.0909L6.5 10.1818V12.3636Z"
        fill={color}
      />
    </Svg>
  );
};

export default RefreshIcon;