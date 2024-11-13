import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface SavedOCRDataScreenProps {
  route: {
    params: {
      parsedData: object;
    };
  };
}

const SavedOCRDataScreen: React.FC<SavedOCRDataScreenProps> = ({ route }) => {
  const { parsedData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>파싱된 OCR 데이터</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.resultText}>{JSON.stringify(parsedData, null, 2)}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    padding: 10,
  },
  resultText: {
    fontSize: 14,
    color: '#333',
  },
});

export default SavedOCRDataScreen;
