import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GradientText, GrButton, Layout } from "../../components";
import { authService } from "../../shared/store/store";
import LinearGradient from "react-native-linear-gradient";

const Questions = observer(({ navigation }) => {
  const { logout, dayTest } = authService;
  const [isSelected, setIsSelected] = useState<{
    state: boolean;
    selectedIndex: number;
  }>({
    state: false,
    selectedIndex: 0,
  });

  //   const DATA = [
  //     {
  //       title: dayTest.question_title,
  //       data: dayTest.answers.map((e) => e.answer_title),
  //     },
  //   ];

  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto", "sigma", "sigma", "sigma", "sigma"],
    },
  ];

  return (
    <Layout>
      <View style={styles.mainConteiner}>
        <Image source={require("../../../assets/img/banner.png")} />
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
                style={isSelected ? styles.border : ""}
                colors={
                  isSelected.state && index === isSelected.selectedIndex
                    ? ["#9192FC", "#5C5CDE"]
                    : ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0)"]
                }
              >
                <View style={styles.sectionItem}>
                  <Image source={require("../../../assets/img/quiz.png")} />
                  <Text style={styles.answerText}>{item}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.textContainer}>
              <GradientText
                colors={["#9192FC", "#5C5CDE"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.textStart}
              >
                Вопрос {dayTest.question_id} из 10
              </GradientText>
              <Text style={styles.testEnd}>{title}</Text>
            </View>
          )}
        />
        <View style={styles.buttonContainer}>
          <GrButton
            label="Назад"
            onPress={() => console.log("sigma")}
            desabled={dayTest.question_id === 1}
            colors={
              dayTest.question_id === 1
                ? ["rgba(252, 145, 145, 0.2)", "rgba(222, 92, 108, 0.2)"]
                : ["rgba(252, 145, 145, 1)", "rgba(222, 92, 108, 1)"]
            }
          />
          <GrButton
            label={
              dayTest.question_id === dayTest.question_count
                ? "Завершить тест"
                : "Далее"
            }
            onPress={() => {
              isSelected
                ? console.log("sigma")
                : navigation.navigate("Results");
            }}
            desabled={!isSelected.state}
            colors={
              isSelected
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
