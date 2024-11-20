import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <path d="M9.6 0H12V12H9.6V0ZM0 7.5H2.4V12H0V7.5ZM4.8 3.75H7.2V12H4.8V3.75Z" fill="#12B76A"/>
</svg>
`;

interface DifficultyIconProps {
    width?: number;
    height?: number;
}

const DifficultyIcon: React.FC<DifficultyIconProps> = ({ width = 12, height = 12 }) => (
    <SvgXml xml={xml} width={width} height={height} />
);

export default DifficultyIcon;