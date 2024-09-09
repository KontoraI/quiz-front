import React, { useEffect } from "react";
import { Header } from "../../components";
import { observer } from "mobx-react-lite";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { authService } from "../../shared/store/authStore";
import LinearGradient from "react-native-linear-gradient";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { quizService } from "../../shared/store/quizStore";
import { useTypedNavigation } from "../../shared/hooks";
import { GradientButton, GradientText, Layout, Loader } from "../../shared/ui";

const QuizScreen: React.FC = observer(() => {
  const { isLoading, startTest, testRequest } = authService;
  const { quizRequest, getResults } = quizService;

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

  const navigation = useTypedNavigation();

  return (
    <Layout>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={[styles.mainContainer, styles.shadowContainer]}>
          <Header
            loading={false}
            isSelected={{
              state: false,
              selectedIndex: 0,
            }}
          />
          <View style={[styles.banner]}>
            <Image
              resizeMode="cover"
              style={{
                flex: 1,
                height: undefined,
                width: undefined,
                maxWidth: 82,
                maxHeight: 90,
              }}
              source={require("../../../assets/img/bannerIcon.png")}
            />
            <Image
              resizeMode="cover"
              style={{
                flex: 1,
                height: undefined,
                width: undefined,
                maxHeight: 90,
                borderRadius: 8,
              }}
              source={require("../../../assets/img/newBanner.png")}
            />
          </View>
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
            <View>
              <GradientButton
                label={
                  startTest.test_finished
                    ? "Смотреть результаты"
                    : "Начать тест"
                }
                onPress={async () =>
                  !startTest.test_finished
                    ? await quizRequest(1).finally(() => {
                        navigation.navigate("Questions");
                      })
                    : await getResults().finally(() =>
                        navigation.navigate("Results")
                      )
                }
                disabled={false}
                colors={["#9192FC", "#5C5CDE"]}
              />
            </View>
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
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  banner: {
    display: "flex",
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    maxHeight: 90,
    marginBottom: 10,
  },
  container: {
    padding: 15,
    borderRadius: 10,
    gap: 20,
    width: "100%",
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
