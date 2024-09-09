import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { observer } from "mobx-react-lite";
import GradientText from "../GradientText/GradientText";

interface ButtonProps {
  code?: string;
  email?: string;
  label: string;
  onPress: () => void;
  disabled: boolean;
  colors: string[];
  location?: number[];
  style?: ViewStyle;
  labelColor?: string[];
}

const GradientButton: React.FC<ButtonProps> = observer(
  ({
    label,
    onPress,
    disabled = false,
    colors,
    location,
    style,
    labelColor,
  }) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[{ width: "100%" }, style]}
        onPress={onPress}
      >
        <LinearGradient
          colors={colors}
          style={styles.styleButton}
          locations={location}
        >
          <GradientText
            style={[styles.styleText]}
            colors={labelColor ? labelColor : ["#fff", "#fff"]}
          >
            {label}
          </GradientText>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
);

export default GradientButton;

const styles = StyleSheet.create({
  styleButton: {
    borderRadius: 47.5,
    alignItems: "center",
    justifyContent: "center",
  },
  styleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginVertical: 16,
  },
});
