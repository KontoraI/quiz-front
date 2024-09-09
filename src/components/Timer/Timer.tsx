import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GradientText from "../../shared/ui/GradientText/GradientText";

interface TimerProps {
  onTimerEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimerEnd();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimerEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <View>
      <GradientText style={styles.timerText} colors={["#9192FC", "#5C5CDE"]}>
        {minutes + ":" + (seconds < 10 ? "0" : "") + seconds}
      </GradientText>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  timerText: {
    fontWeight: "700",
    fontSize: 18,
  },
});
