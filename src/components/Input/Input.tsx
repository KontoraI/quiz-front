import React, { useRef } from "react";
import { View, Animated, TextInput, StyleSheet } from "react-native";

interface InputProps {
  email?: string;
  label: string;
  setEmail?: (e: string) => void;
  code?: string;
  setCode?: (e: string) => void;
}

const Input: React.FC<InputProps> = ({ ...props }) => {
  const transY = useRef(new Animated.Value(0));

  const handleFocus = () => {
    Animated.timing(transY.current, {
      toValue: -15,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(transY.current, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.inputContainer}>
      <Animated.Text
        style={[
          styles.placeholderText,
          { transform: [{ translateY: transY.current }] },
        ]}
      >
        {props.label}
      </Animated.Text>
      <TextInput
        autoCapitalize={"none"}
        autoFocus={false}
        style={styles.styleInput}
        value={props.email || props.code}
        onFocus={() => handleFocus()}
        onBlur={() => {
          if (!props.code && !props.email) {
            handleBlur();
          }
        }}
        onChangeText={(e) => {
          if (props.label === "Почта") {
            props.setEmail!(e);
          } else {
            props.setCode!(e);
          }
        }}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#F8FBFF",
    borderRadius: 13,
    height: 70,
    justifyContent: "center",
  },
  styleInput: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    fontWeight: "400",
    fontSize: 18,
    top: 10,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: "400",
    position: "absolute",
    paddingLeft: 25,
    color: "#9192FC",
  },
});
