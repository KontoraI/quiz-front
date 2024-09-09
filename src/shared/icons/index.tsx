import React from "react";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Path,
  SvgProps,
} from "react-native-svg";

export const LoaderIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 4C11.163 4 4 11.163 4 20a2 2 0 11-4 0C0 8.954 8.954 0 20 0s20 8.954 20 20a2 2 0 11-4 0c0-8.837-7.163-16-16-16z"
        fill="#9192FC"
      />
    </Svg>
  );
};

export const ProfileIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={26} height={25} viewBox="0 0 26 25" fill="none" {...props}>
      <Path
        d="M21.612 23.889a8.889 8.889 0 00-17.778 0"
        stroke="#ACACAC"
        strokeLinecap="round"
      />
      <Circle cx={13.2771} cy={6.66677} r={5.61111} stroke="#ACACAC" />
    </Svg>
  );
};

export const InfoIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={26} height={25} viewBox="0 0 26 25" fill="none" {...props}>
      <G clipPath="url(#clip0_2542_2093)" stroke="#ACACAC">
        <Path d="M12.801 19.453c-.667 0-1.208-.54-1.208-1.208V10.41c0-.667.54-1.208 1.208-1.208v0c.667 0 1.208.541 1.208 1.208v7.835c0 .667-.54 1.208-1.208 1.208v0zm.007-11.706a1.41 1.41 0 01-.988-.38 1.226 1.226 0 01-.414-.928c0-.365.138-.674.414-.927.276-.258.605-.387.988-.387.387 0 .716.129.987.387.276.253.414.562.414.927 0 .36-.138.67-.414.928-.271.253-.6.38-.987.38z" />
        <Circle cx={13} cy={12.5} r={12} />
      </G>
      <Defs>
        <ClipPath id="clip0_2542_2093">
          <Path fill="#fff" d="M0 0H26V25H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const QuitIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={26} height={25} viewBox="0 0 26 25" fill="none" {...props}>
      <G
        clipPath="url(#clip0_2542_2096)"
        stroke="#ACACAC"
        strokeLinecap="round"
      >
        <Path d="M11.333 24.166h9.166A4.167 4.167 0 0024.666 20V5A4.167 4.167 0 0020.499.833h-9.166M1.69 12.5h15" />
        <Path d="M5.633 8.26l-4.3 4.3 4.3 4.299" strokeLinejoin="round" />
      </G>
      <Defs>
        <ClipPath id="clip0_2542_2096">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H25V25H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const HomeIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg width={25} height={26} viewBox="0 0 25 26" fill="none" {...props}>
      <Path
        d="M4.583 10.084v12.083h5.625V15.5h4.583v6.667h5.625V10.5"
        stroke="#fff"
        strokeLinejoin="round"
      />
      <Path
        d="M22.5 12.167l-10.345-9.31-9.655 9.31"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const ArrowIcon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg
      width={14}
      height={25}
      viewBox="0 0 14 25"
      fill="none"
      {...props}
    >
      <Path
        d="M1.314 1.187L12.627 12.5 1.314 23.814"
        stroke="#CCC"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
