import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../../components";
import LinearGradient from "react-native-linear-gradient";
import { quizService } from "../../shared/store/quizStore";
import { useTypedNavigation } from "../../shared/hooks";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GradientButton, GradientText, Layout } from "../../shared/ui";

const Questions = observer(() => {
  const { dayTest, quizRequest, setAnswer, getResults, loading, setLoading } =
    quizService;
  const [isSelected, setIsSelected] = useState<{
    state: boolean;
    selectedIndex: number;
  }>({
    state: false,
    selectedIndex: 0,
  });
  const [hasSelect, setHasSelect] = useState(false);

  const opacity = useSharedValue(1);

  const handleAnswerSelect = (index: number) => {
    if (index === isSelected.selectedIndex && isSelected.state) {
      clearOpacity();
      setIsSelected({ state: false, selectedIndex: 0 });
    } else {
      clearOpacity();
      setIsSelected({ state: true, selectedIndex: index });
      opacity.value = withTiming(0.6, { duration: 300 });
    }
  };

  const clearOpacity = () => {
    opacity.value = withTiming(1, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (dayTest.selected_answer) {
      setIsSelected({
        state: true,
        selectedIndex: dayTest.selected_answer - 1,
      });
      handleAnswerSelect(dayTest.selected_answer - 1);
    }
  }, [dayTest.question_id]);

  const navigation = useTypedNavigation();

  const DATA = [
    {
      title: dayTest.question_title,
      data: dayTest.answers.map((e) => e.answer_title),
    },
  ];

  return (
    <Layout>
      <View style={styles.mainConteiner}>
        <Header loading={loading} isSelected={isSelected} />
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <Animated.View
              style={[
                isSelected.state && index !== isSelected.selectedIndex
                  ? animatedStyle
                  : {
                      opacity: 1,
                    },
              ]}
            >
              <TouchableOpacity
                style={styles.sectionList}
                onPressIn={() => {
                  clearOpacity();
                  handleAnswerSelect(index);
                  setHasSelect(false);
                }}
              >
                <LinearGradient
                  colors={
                    isSelected.state && index === isSelected.selectedIndex
                      ? ["#9192FC", "#5C5CDE"]
                      : ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"]
                  }
                  style={styles.border}
                >
                  <View style={styles.sectionItem}>
                    <Image source={require("../../../assets/img/quiz.png")} />
                    <Text style={[styles.answerText]}>{item}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ minWidth: "100%" }}>
              <Animated.View style={[styles.banner, animatedStyle]}>
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
              </Animated.View>
              <Animated.View style={[styles.textContainer, animatedStyle]}>
                <GradientText
                  colors={["#9192FC", "#5C5CDE"]}
                  start={{ x: 1, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.textStart}
                >
                  Вопрос {dayTest.question_id} из {dayTest.questions_count}
                </GradientText>
                <Text style={styles.testEnd}>{title}</Text>
              </Animated.View>
            </View>
          )}
        />
        <View style={styles.buttonContainer}>
          <GradientButton
            label="Назад"
            onPress={() => {
              setLoading(true);
              quizRequest(dayTest.question_id - 1);
              setIsSelected({ state: false, selectedIndex: 0 });
              clearOpacity();
              setHasSelect(false);
            }}
            disabled={dayTest.question_id === 1 || loading}
            colors={
              dayTest.question_id === 1
                ? ["rgba(252, 145, 145, 0.2)", "rgba(222, 92, 108, 0.2)"]
                : ["rgba(252, 145, 145, 1)", "rgba(222, 92, 108, 1)"]
            }
          />
          <LinearGradient
            style={{ padding: 2, borderRadius: 30 }}
            colors={hasSelect ? ["#FC9191", "#DE5C6C"] : ["#fff", "#fff"]}
          >
            <GradientButton
              label={
                dayTest.question_id === dayTest.questions_count
                  ? "Завершить тест"
                  : hasSelect
                  ? "Выберите вариант ответа"
                  : "Далее"
              }
              labelColor={hasSelect ? ["#FC9191", "#DE5C6C"] : ["#fff", "#fff"]}
              onPress={async () => {
                setLoading(true);
                if (isSelected.state) {
                  await setAnswer(
                    dayTest.question_id,
                    isSelected.selectedIndex + 1
                  );
                  if (dayTest.question_id === dayTest.questions_count) {
                    await getResults().finally(() =>
                      navigation.navigate("Results")
                    );
                  } else {
                    await quizRequest(dayTest.question_id + 1);
                  }
                  setIsSelected({ state: false, selectedIndex: 0 });
                  clearOpacity();
                } else {
                  setHasSelect(true);
                  clearOpacity();
                }
              }}
              colors={
                hasSelect
                  ? ["#FBFCFF", "#F8FBFF"]
                  : ["rgba(145, 146, 252, 1)", 'rgba(92, 92, 222, 1)"']
              }
              disabled={false}
            />
          </LinearGradient>
        </View>
      </View>
    </Layout>
  );
});

export default Questions;

const styles = StyleSheet.create({
  mainConteiner: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  sectionList: {
    padding: 10,
    width: "100%",
  },
  sectionItem: {
    display: "flex",
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "#F8FBFF",
    flexDirection: "row",
    gap: 15,
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "rgba(248, 252, 255, 1)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 10,
  },
  textContainer: {
    padding: 15,
    gap: 20,
    borderRadius: 10,
    backgroundColor: "#F8FBFF",
  },
  textStart: {
    fontSize: 27,
    fontWeight: "600",
  },
  testEnd: {
    fontSize: 18,
    fontWeight: "400",
  },
  border: {
    borderRadius: 10,
    padding: 2,
  },
  answerText: {
    fontWeight: "600",
    fontSize: 18,
  },
  banner: {
    display: "flex",
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    height: 90,
    marginBottom: 10,
  },
});
