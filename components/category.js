import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { theme } from "./theme";
import { useSelector } from "react-redux";

export default function Category({ navigation }) {
  const categoryList = useSelector((state) => state.categoryList);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    categoryList: {
      flexDirection: "row",
      flexWrap: "wrap",
      paddingVertical: 10,
    },
    categoryItem: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    categoryImage: {
      width: theme.deviceWidth / 3 - 20,
      height: theme.deviceWidth / 3 - 20,
      borderRadius: theme.deviceWidth / 6 - 10,
      borderColor: "#fff",
      borderWidth: 2,
    },
    categoryText: {
      fontSize: 12,
      marginTop: 10,
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
  });

  return (
    <ImageBackground source={{ uri: "https://t1.daumcdn.net/cfile/tistory/99B0703359F035FB15" }} style={styles.image}>

    <View style={styles.container}>
        <View style={styles.categoryList}>
          {categoryList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => {
                  navigation.navigate("ProductList", {
                    categoryId: item.id,
                    categoryName: item.name,
                    url: `list?category=${item.id}&search&page=`,
                  });
                }}
              >
                <Image
                  style={styles.categoryImage}
                  source={{ uri: item.image }}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
    </View>
    </ImageBackground>

  );
}
