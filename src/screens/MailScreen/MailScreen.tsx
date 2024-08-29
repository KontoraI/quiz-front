import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GradientText, GrButton, Input, Layout } from "../../components";
import { emailRegex } from "../../shared/constants";
import { observer } from "mobx-react-lite";
import { authService } from "../../shared/store/authStore";

const MailScreen: React.FC = observer(({ navigation }) => {
  const [email, setEmail] = useState("");
  const { passwordRequest } = authService;

  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.mainContainer}>
          <View style={[styles.container, styles.shadowContainer]}>
            <GradientText
              start={{ x: 1, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={["rgba(145, 146, 252, 1)", "rgba(92, 92, 222, 1)"]}
              style={styles.containerText}
            >
              Вход
            </GradientText>
            <LinearGradient
              colors={
                !email
                  ? ["rgba(145, 146, 252, 0.25)", "rgba(92, 92, 222, 0.25)"]
                  : emailRegex.test(email)
                  ? ["#6CCD64", "#5BCA7A"]
                  : ["#FC9191", "#DE5C6C"]
              }
              style={styles.gradientBorder}
            >
              <Input setEmail={setEmail} email={email} label="Почта" />
            </LinearGradient>
            <GrButton
              colors={
                emailRegex.test(email!)
                  ? ["#9192FC", "#5C5CDE"]
                  : ["rgba(145, 146, 252, 0.25)", "rgba(92, 92, 222, 0.25)"]
              }
              disabled={!emailRegex.test(email!)}
              label="Продолжить"
              email={email}
              onPress={async () => {
                await passwordRequest(email).finally(() => {
                  navigation.navigate("CodeScreen");
                });
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Layout>
  );
});

export default MailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#F8FBFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    gap: 15,
    width: "100%",
  },
  gradientBorder: {
    position: "relative",
    borderRadius: 15,
    padding: 2,
    height: 74,
    width: 354,
    zIndex: 1,
  },
  shadowContainer: {
    shadowColor: "#D8E4FA",
    overflow: "visible",
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  containerText: {
    width: 350,
    fontWeight: "600",
    textAlign: "center",
    fontSize: 27,
  },
});
