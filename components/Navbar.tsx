import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      <NavItem title="홈" onPress={() => navigation.navigate('Home')} />
      <NavItem title="바코드" onPress={() => navigation.navigate('BarcodeRead')} />
      <NavItem title="OCR" onPress={() => navigation.navigate('OCRModeScreen')} />
      <NavItem title="마이페이지" onPress={() => navigation.navigate('MyPage')} />
    </View>
  );
};

interface NavItemProps {
  title: string;
  onPress: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ title, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Text style={styles.navText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    height: 60,

    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
   color:"#000000",
    fontSize: 15,
  },
});

export default Navbar;
