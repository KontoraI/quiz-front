import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { codeRegex } from "../../shared/constants";
import { observer } from "mobx-react-lite";
import { authService } from "../../shared/store/authStore";
import { GradientButton, GradientText, Layout } from "../../shared/ui";
import { Input, Timer } from "../../components";

const CodeScreen: React.FC = observer(() => {
  const [timer, setTimer] = useState(false);
  const [code, setCode] = useState("");
  const { login, emailStore, correctCode } = authService;

  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.mainContainer}>
          <View style={[styles.container, styles.shadowContainer]}>
            <GradientText
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              colors={["rgba(145, 146, 252, 1)", "rgba(92, 92, 222, 1)"]}
              style={styles.containerText}
            >
              Вход
            </GradientText>
            <LinearGradient
              colors={
                !code
                  ? ["rgba(145, 146, 252, 0.25)", "rgba(92, 92, 222, 0.25)"]
                  : codeRegex.test(code)
                  ? ["#6CCD64", "#5BCA7A"]
                  : ["#FC9191", "#DE5C6C"]
              }
              style={styles.gradientBorder}
            >
              <Input label={"Код из почты"} code={code} setCode={setCode} />
            </LinearGradient>
            {correctCode && (
              <View style={styles.wrongCodeContainer}>
                <GradientText
                  style={styles.wrongCodeText}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 0, y: 0 }}
                  colors={["#FC9191", "#DE5C6C"]}
                >
                  Неверный код
                </GradientText>
              </View>
            )}

            <TouchableOpacity
              disabled={timer}
              style={styles.codeContainer}
              onPress={() => {
                setTimer(true);
              }}
            >
              <GradientText
                style={styles.gradientCodeText}
                colors={
                  timer
                    ? ["rgba(145, 146, 252, 0.25)", "rgba(92, 92, 222, 0.25)"]
                    : ["rgba(145, 146, 252,1)", "rgba(92, 92, 222, 1)"]
                }
              >
                Отправить код заново
              </GradientText>
              {timer && (
                <Timer
                  onTimerEnd={() => {
                    setTimer(false);
                  }}
                />
              )}
            </TouchableOpacity>
            <GradientButton
              colors={
                codeRegex.test(code)
                  ? ["#9192FC", "#5C5CDE"]
                  : ["rgba(145, 146, 252, 0.25)", "rgba(92, 92, 222, 0.25)"]
              }
              disabled={!codeRegex.test(code!)}
              label="Войти"
              code={code}
              onPress={async () => {
                await login(emailStore, code);
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Layout>
  );
});

export default CodeScreen;

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
    width: "100%",
  },
  inputContainer: {
    backgroundColor: "#F8FBFF",
    borderRadius: 13,
  },
  styleInput: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    height: 70,
    fontWeight: "400",
    fontSize: 18,
  },
  shadowContainer: {
    shadowColor: "#D8E4FA",
    overflow: "visible",
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  containerText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 27,
  },

  gradientCodeText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#9192FC",
  },
  codeContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrongCodeContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 20,
  },
  wrongCodeText: {
    alignSelf: "flex-start",
    fontWeight: "400",
    fontSize: 18,
  },
});
