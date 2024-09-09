import React from "react";
import { Text, TextProps } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import LinearGradient from "react-native-linear-gradient";

interface GradientTextProps extends TextProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
}

const GradientText: React.FC<GradientTextProps> = (props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        locations={props.locations}
        colors={props.colors}
        start={props.start}
        end={props.end}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
