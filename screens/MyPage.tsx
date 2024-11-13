import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomBlock from '../components/CustomBlock'; // CustomBlock 경로에 맞게 수정

const MyPage: React.FC = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CustomBlock title="즐겨찾기" onPress={() => alert('즐겨찾기 보기')} />
        <CustomBlock title="알레르기" onPress={() => navigation.navigate("AllergenSetting")}  />
      </View>
      <View style={styles.row}>
        <CustomBlock title="기록" onPress={() => alert('기록 보기')}  />
        <CustomBlock title="도움말" onPress={() => alert('도움말 열기')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly', // 위아래로 균등한 간격
    padding: 20,
   
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
     
  },

});

export default MyPage;