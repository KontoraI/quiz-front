import React from "react";

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
import { useTypedNavigation } from "../../shared/hooks";
import { HomeIcon } from "../../shared/icons";
import { GradientButton, GradientText, Layout } from "../../shared/ui";
import { Header } from "../../components";

const Results = observer(() => {
  const { resultText } = quizService;

  const { width } = useWindowDimensions();

  const source = {
    html: resultText,
  };

  const tagStyles = {
    body: {
      fontSize: 18,
    },
  };

  const navigation = useTypedNavigation();

  return (
    <Layout>
      <ScrollView
        stickyHeaderIndices={[2]}
        contentContainerStyle={styles.mainContainer}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
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
        <View style={styles.gradientContainer}>
          <GradientText
            colors={["rgba(145, 146, 252, 1)", "rgba(92, 92, 222, 1)"]}
            style={styles.gradientText}
          >
            Результаты
          </GradientText>
        </View>
        <View style={[styles.textContainer, { minWidth: "100%" }]}>
          <RenderHtml
            source={source}
            tagsStyles={tagStyles}
            contentWidth={width}
          />
          <View>
            <HomeIcon style={styles.icon} />
            <GradientButton
              label={`На главный экран`}
              onPress={() => navigation.navigate("QuizScreen")}
              disabled={false}
              colors={["#5C5CDE", "#9192FC"]}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
});

export default Results;

const styles = StyleSheet.create({
  mainContainer: {
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
    width: "100%",
  },
  icon: {
    top: "50%",
    zIndex: 111,
    left: "18%",
  },
  banner: {
    marginTop: -10,
    display: "flex",
    alignSelf: "center",
    flexDirection: "row",
    gap: 10,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    height: 90,
  },
});
