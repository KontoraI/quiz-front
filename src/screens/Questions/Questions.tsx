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
import { GradientText, GrButton, Layout } from "../../components";
import { authService } from "../../shared/store/authStore";
import LinearGradient from "react-native-linear-gradient";
import { quizService } from "../../shared/store/quizStore";

const Questions = observer(({ navigation }) => {
  const { dayTest, quizRequest, setAnswer, getResults, loading, setLoading } =
    quizService;
  const [isSelected, setIsSelected] = useState<{
    state: boolean;
    selectedIndex: number;
  }>({
    state: false,
    selectedIndex: 0,
  });

  useEffect(() => {
    if (dayTest.selected_answer) {
      setIsSelected({
        state: true,
        selectedIndex: dayTest.selected_answer - 1,
      });
    }
  }, [dayTest.question_id]);

  const DATA = [
    {
      title: dayTest.question_title,
      data: dayTest.answers.map((e) => e.answer_title),
    },
  ];

  return (
    <Layout>
      <View style={styles.mainConteiner}>
        <Image
          style={{ opacity: isSelected.state || loading ? 0.7 : 1 }}
          source={require("../../../assets/img/banner.png")}
        />
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.sectionList}
              onPress={() =>
                setIsSelected({ state: true, selectedIndex: index })
              }
            >
              <LinearGradient
                style={[
                  isSelected.state ? styles.border : "",
                  {
                    opacity:
                      (isSelected.state &&
                        isSelected.selectedIndex !== index) ||
                      loading
                        ? 0.7
                        : 1,
                  },
                  ,
                ]}
                colors={
                  isSelected.state && index === isSelected.selectedIndex
                    ? ["#9192FC", "#5C5CDE"]
                    : ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"]
                }
              >
                <View style={styles.sectionItem}>
                  <Image source={require("../../../assets/img/quiz.png")} />
                  <Text
                    style={[
                      styles.answerText,
                      {
                        opacity:
                          (isSelected.state &&
                            isSelected.selectedIndex !== index) ||
                          loading
                            ? 0.7
                            : 1,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View
              style={[
                styles.textContainer,
                {
                  opacity: isSelected.state || loading ? 0.7 : 1,
                },
              ]}
            >
              <GradientText
                colors={["#9192FC", "#5C5CDE"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.textStart}
              >
                Вопрос {dayTest.question_id} из {dayTest.questions_count}
              </GradientText>
              <Text style={styles.testEnd}>{title}</Text>
            </View>
          )}
        />
        <View style={styles.buttonContainer}>
          <GrButton
            label="Назад"
            onPress={() => {
              setLoading(true);
              quizRequest(dayTest.question_id - 1);
              setIsSelected({ state: false, selectedIndex: 0 });
            }}
            disabled={dayTest.question_id === 1 || loading}
            colors={
              dayTest.question_id === 1
                ? ["rgba(252, 145, 145, 0.2)", "rgba(222, 92, 108, 0.2)"]
                : ["rgba(252, 145, 145, 1)", "rgba(222, 92, 108, 1)"]
            }
          />
          <GrButton
            label={
              dayTest.question_id === dayTest.questions_count
                ? "Завершить тест"
                : "Далее"
            }
            onPress={async () => {
              if (isSelected.state) {
                await setAnswer(
                  dayTest.question_id,
                  isSelected.selectedIndex + 1
                );
                if (dayTest.question_id === dayTest.questions_count) {
                  await getResults().finally(navigation.navigate("Results"));
                } else {
                  await quizRequest(dayTest.question_id + 1);
                }
                setIsSelected({ state: false, selectedIndex: 0 });
              }
            }}
            disabled={!isSelected.state || loading}
            colors={
              isSelected.state
                ? ["rgba(145, 146, 252, 1)", 'rgba(92, 92, 222, 1)"']
                : ["rgba(145, 146, 252, 0.4)", "rgba(92, 92, 222, 0.4)"]
            }
          />
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
  },
  sectionList: {
    padding: 10,
    width: 380,
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
    padding: 10,
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
});
