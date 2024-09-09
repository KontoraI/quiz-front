import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { userService } from "../../shared/store/userStore";
import { useTypedNavigation } from "../../shared/hooks";
import { HomeIcon } from "../../shared/icons";

import { GradientText, GradientButton, Layout } from "../../shared/ui";
import { Header } from "../../components";

const Profile: React.FC = () => {
  const { user } = userService;

  const navigation = useTypedNavigation();

  return (
    <Layout>
      <Header
        loading={false}
        isSelected={{
          state: false,
          selectedIndex: 0,
        }}
      />
      <View
        style={{ flex: 1, justifyContent: "space-between", paddingBottom: 10 }}
      >
        <View style={styles.container}>
          <GradientText
            style={styles.gradientText}
            colors={["#5C5CDE", "#9192FC"]}
          >
            Продолжить
          </GradientText>
          <Text style={styles.text}>Email: {user.email}</Text>
        </View>
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

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: 112,
    backgroundColor: "#F8FBFF",
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-around",
  },
  gradientText: {
    fontSize: 27,
    fontWeight: "600",
  },
  text: {
    fontSize: 18,
  },
  icon: {
    top: "50%",
    zIndex: 111,
    left: "20%",
  },
});
