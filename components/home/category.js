import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {categoryList} from '../../database/item';
import {theme} from '../theme';


export default function Category({navigation}) {
  const styles = StyleSheet.create({
    categoryList: {
      paddingHorizontal: 20,
      marginBottom: 10,
      marginTop: 20,
    },
    categoryTitle: {
      fontSize: 15,
      fontWeight: "bold",
      marginBottom: 10,
    },
    categoryItem: {
      marginRight: 20,
    },
    categoryImage: {
      width: theme.deviceWidth / 5,
      height: theme.deviceWidth / 5,
      borderRadius: theme.deviceWidth / 10,
      borderColor: "#fff",
      borderWidth: 3,
    },
    categoryText: {
      fontSize: 12,
      marginTop: 5,
      fontWeight: "400",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.categoryList}>
      <Text style={styles.categoryTitle}>카테고리</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {Object.keys(categoryList).map((key) => {
          return (
            <TouchableOpacity 
              onPress={()=>{navigation.navigate('ProductList')}}
            key={key} style={styles.categoryItem}>
              <Image
                source={{ uri: categoryList[key].image }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{categoryList[key].name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}   