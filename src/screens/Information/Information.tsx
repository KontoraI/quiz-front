import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowIcon, HomeIcon } from "../../shared/icons";
import { useTypedNavigation } from "../../shared/hooks";
import { GradientButton, Layout } from "../../shared/ui";

const Information: React.FC = () => {
  const navigation = useTypedNavigation();
  return (
    <Layout>
      <View style={styles.mainContainer}>
        <Image
          style={styles.img}
          source={require("../../../assets/img/newBannerIcon.png")}
        />
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: "space-between" }}
        >
          <View style={styles.container}>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.text}>Оценить в App Store</Text>
              <ArrowIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.text}>Лицензионное соглашение</Text>
              <ArrowIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.text}>Политика конфиденциальности</Text>
              <ArrowIcon />
            </TouchableOpacity>
            <View style={styles.item}>
              <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Neque egestas congue quisque egestas.Amet massa vitae tortor
                condime
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={{ width: "100%" }}>
          <HomeIcon style={styles.icon} />
          <GradientButton
            label={`На главный экран`}
            onPress={() => navigation.navigate("QuizScreen")}
            disabled={false}
            colors={["#5C5CDE", "#9192FC"]}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Information;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  scrollContent: {
    flex: 1,
  },
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
    gap: 10,
  },
  icon: {
    top: "50%",
    zIndex: 111,
    left: "20%",
  },
  img: {
    width: 153,
    height: 144,
    borderRadius: 90,
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 15,
    backgroundColor: "#FBFCFF",
    borderRadius: 15,
    minHeight: 74,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});
