import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.detail}>원재료명: {product.ingredients}</Text>
      <Text style={styles.detail}>알레르기: {product.allergens}</Text>
      <Text style={styles.detail}>보관방법: {product.storage}</Text>
      <Text style={styles.detail}>영양정보: {product.nutrition}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProductDetailScreen;


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ProductDetailScreen = ({ route }) => {
//   const { product } = route.params;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>{product.name}</Text>
//       <Text style={styles.description}>{product.description}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#ffffff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   description: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default ProductDetailScreen;
