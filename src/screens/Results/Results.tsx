import React from "react";
import { GradientText, GrButton, Layout } from "../../components";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { observer } from "mobx-react-lite";

const Results = observer(({ navigation }) => {
  return (
    <Layout>
      <ScrollView
        stickyHeaderIndices={[1]}
        contentContainerStyle={styles.mainConteiner}
      >
        <Image source={require("../../../assets/img/banner.png")} />
        <View style={styles.gradientContainer}>
          <GradientText
            colors={["rgba(145, 146, 252, 1)", "rgba(92, 92, 222, 1)"]}
            style={styles.gradientText}
          >
            Результаты
          </GradientText>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            obcaecati rerum iste perferendis sed voluptatum culpa dolorum
            tempore! Mollitia quibusdam, in cum perferendis alias, quos iste
            dolores impedit atque possimus unde vero hic dignissimos nostrum
            explicabo? Pariatur, libero asperiores excepturi necessitatibus
            tempore eveniet aliquid itaque sunt laborum, molestiae sequi alias
            eaque quidem minus maxime vel iste quis rem, quia deserunt cum
            reprehenderit cupiditate dicta commodi? Perferendis doloremque vero
            impedit. Beatae recusandae illo obcaecati, voluptatibus blanditiis
            iure itaque. Doloremque pariatur corrupti cum aut necessitatibus
            odio enim maiores excepturi! Rem odit mollitia, similique commodi
            laudantium tenetur facilis accusantium officiis, quo ipsum aperiam
            eligendi animi delectus aliquid itaque iusto neque sint, cum vel!
            Unde illo, molestias ducimus dolor et nam, nesciunt atque nulla hic
            quaerat debitis provident, recusandae nisi molestiae aut asperiores?
            Qui distinctio amet vel a quas voluptatum eaque earum quod
            blanditiis nobis? Sapiente error quia deserunt assumenda, debitis
            laboriosam quibusdam voluptate! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Neque distinctio repellat asperiores
            corporis, vel numquam aut accusantium labore at expedita fugit
            veritatis, a officiis optio quis, dolores assumenda autem
            consequatur. Voluptatem, voluptas nemo mollitia molestiae esse
            asperiores tenetur. Blanditiis rerum a qui doloremque accusantium
            perspiciatis praesentium nulla voluptatibus suscipit magni.
          </Text>
          <GrButton
            label={"На главный экран"}
            onPress={() => {
              navigation.navigate("QiuzScreen");
            }}
            desabled={false}
            colors={["rgba(145, 146, 252, 1)", "rgba(92, 92, 222, 1)"]}
          />
        </View>
      </ScrollView>
    </Layout>
  );
});

export default Results;

const styles = StyleSheet.create({
  mainConteiner: {
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
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
  },
});
