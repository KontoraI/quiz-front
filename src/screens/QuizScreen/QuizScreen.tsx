import React, { useState } from "react";
import { GradientText, GrButton, Layout } from "../../components";
import { observer } from "mobx-react-lite";
import { Image, StyleSheet, View } from "react-native";
import { authService } from "../../shared/store/store";
import LinearGradient from "react-native-linear-gradient";
import Loader from "../LoadScreen/Loader";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

const QuizScreen: React.FC = observer(({ navigation }) => {
  const { isLoading, startTest, quizRequest } = authService;
  const [index, setIndex] = useState(1);

  const description = {
    html: startTest.description,
  };

  const { width } = useWindowDimensions();

  const tagsStyles = {
    body: {
      fontSize: "18",
      fontWeight: "400",
    },
  };

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={[styles.mainContainer, styles.shadowContainer]}>
          <Image source={require("../../../assets/img/banner.png")} />
          <LinearGradient
            style={styles.container}
            colors={["#F8FBFF", "#FBFCFF"]}
          >
            <GradientText
              style={styles.textBlockStart}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={["#9192FC", "#5C5CDE"]}
            >
              {startTest.test_finished
                ? startTest.day_title
                : `Поздравляем,\nВы прошли ${startTest.day_number}/10 дней`}
            </GradientText>
            {startTest.test_finished && (
              <RenderHtml
                source={description}
                contentWidth={width}
                tagsStyles={tagsStyles.body}
              />
            )}
            <GrButton
              label={
                startTest.test_finished ? "Смотреть результаты" : "Начать тест"
              }
              onPress={() =>
                startTest.test_finished
                  ? navigation.navigate("Results")
                  : quizRequest(index).finally(() =>
                      navigation.navigate("Questions")
                    )
              }
              desabled={false}
              colors={["#9192FC", "#5C5CDE"]}
            />
          </LinearGradient>
        </View>
      )}
    </Layout>
  );
});

export default QuizScreen;

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    alignSelf: "center",
    height: "100%",
    flex: 1,
  },
  container: {
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    gap: 20,
  },
  shadowContainer: {
    shadowColor: "#D8E4FA",
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  textBlockStart: {
    fontSize: 27,
    fontWeight: "600",
  },
  textBlockMiddle: {
    fontSize: 18,
    fontWeight: "400",
  },
  textBlockEnd: {
    fontSize: 18,
    fontWeight: "400",
  },
});
