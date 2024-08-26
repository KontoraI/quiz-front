import React from "react";
import { Image, StyleSheet, View } from "react-native";


const Loader: React.FC = () => {
  return (
    <View>
      <Image
        style={styles.backGound}
        source={require("../../../assets/img/eclipse.png")}
      />
      <Image
        style={styles.image}
        source={require("../../../assets/img/loader.png")}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  backGound: {
    position: "absolute",
    top: 250,
    left: 65,
  },
  image: {
    position: "absolute",
    top: 321,
    left: 115,
  },
});
