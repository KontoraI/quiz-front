import React, { useEffect } from "react";
import { GradientText, GrButton, Layout } from "../../components";
import { observer } from "mobx-react-lite";
import { Image, StyleSheet, View } from "react-native";
import { authService } from "../../shared/store/authStore";
import LinearGradient from "react-native-linear-gradient";
import Loader from "../LoadScreen/Loader";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { quizService } from "../../shared/store/quizStore";

const QuizScreen: React.FC = observer(({ navigation }) => {
  const { isLoading, logout } = authService;
  const { startTest, quizRequest, testRequest } = quizService;

  const { width } = useWindowDimensions();

  useEffect(() => {
    const load = async () => {
      await testRequest();
    };

    load();
  }, []);

  const description = {
    html: startTest.description,
  };

  const tagsStyles = {
    body: {
      fontSize: 18,
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
                ? `Поздравляем,\nВы прошли ${startTest.day_number}/10 дней`
                : startTest.day_title}
            </GradientText>
            {!startTest.test_finished && (
              <RenderHtml
                source={description}
                contentWidth={width}
                tagsStyles={tagsStyles}
              />
            )}
            <GrButton
              label={
                startTest.test_finished ? "Смотреть результаты" : "Начать тест"
              }
              onPress={async () =>
                !startTest.test_finished
                  ? await quizRequest(1).finally(() => {
                      navigation.navigate("Questions");
                    })
                  : navigation.navigate("Results")
              }
              disabled={false}
              colors={["#9192FC", "#5C5CDE"]}
            />
          </LinearGradient>
          <GrButton
            label={"Выход"}
            onPress={() => logout()}
            disabled={false}
            colors={["white", "blue", "red"]}
          />
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
