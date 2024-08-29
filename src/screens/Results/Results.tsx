import React from "react";
import { GradientText, GrButton, Layout } from "../../components";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { observer } from "mobx-react-lite";
import RenderHtml from "react-native-render-html";
import { quizService } from "../../shared/store/quizStore";

const Results = observer(({ navigation }) => {
  const { getResults, resultText } = quizService;

  const { width } = useWindowDimensions();

  const source = {
    html: resultText,
  };

  const tagStyles = {
    body: {
      fontSize: 18,
    },
  };

  return (
    <Layout>
      <ScrollView
        stickyHeaderIndices={[1]}
        contentContainerStyle={styles.mainConteiner}
      >
        <Image source={require("../../../assets/img/banner.png")} />
        <View style={styles.gradientContainer}>
          <GradientText
            colors={["rgba(145, 146, 252, 1)", "rgba(92, 92, 222, 1)"]}
            style={styles.gradientText}
          >
            Результаты
          </GradientText>
        </View>
        <View style={styles.textContainer}>
          <RenderHtml
            source={source}
            tagsStyles={tagStyles}
            contentWidth={width}
          />
          <GrButton
            label={"На главный экран"}
            onPress={() => {
              getResults();
              navigation.navigate("QiuzScreen");
            }}
            disabled={false}
            colors={["rgba(145, 146, 252, 1)", "rgba(92, 92, 222, 1)"]}
          />
        </View>
      </ScrollView>
    </Layout>
  );
});

export default Results;

const styles = StyleSheet.create({
  mainConteiner: {
    gap: 10,
  },
  gradientContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  gradientText: {
    fontSize: 27,
    fontWeight: "600",
    padding: 15,
  },
  textContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    gap: 18,
  },
});
