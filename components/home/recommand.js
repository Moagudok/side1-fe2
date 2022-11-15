import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { theme, themeIcon } from "../theme";
import { recommandList } from "../../database/item";

const styles = StyleSheet.create({
  recommandBox: {
    marginTop: 20,
  },
  recommandBoxTitle: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5,
  },
  recommandListView: {
    backgroundColor: "white",
    width: theme.deviceWidth,
    height: theme.deviceWidth / 1.3,
    justifyContent: "center",
    alignItems: "center",
  },
  recommandImage: {
    width: theme.deviceWidth - 20,
    height: theme.deviceWidth / 1.3 - 20,
  },
  recommandTitle: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    fontSize: 12,
    width: theme.deviceWidth - 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
});

export const Recommand = () => {
  return (
    <View style={styles.recommandBox}>
      <Text style={styles.recommandBoxTitle}>추천 상품 {themeIcon.adIcon}</Text>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {Object.keys(recommandList).map((key) => {
          return (
            <View key={key} style={styles.recommandListView}>
              <Image
                source={recommandList[key].image}
                style={styles.recommandImage}
              />
              <Text style={styles.recommandTitle}>
                {recommandList[key].name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
