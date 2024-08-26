import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { observer } from "mobx-react-lite";

interface ButtonProps {
  code?: string;
  email?: string;
  label: string;
  setEmail?: (e: string) => void;
  onPress: () => void;
  desabled: boolean;
  colors: string[];
  location?: number[];
  style?: ViewStyle;
}

const GrButton: React.FC<ButtonProps> = observer(
  ({ label, onPress, desabled, colors, location, style }) => {
    return (
      <TouchableOpacity
        disabled={desabled}
        style={[{ width: "100%" }, style]}
        onPress={onPress}
      >
        <LinearGradient
          colors={colors}
          style={styles.styleButton}
          locations={location}
        >
          <Text style={styles.styleText}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
);

export default GrButton;

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
