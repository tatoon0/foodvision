import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.navbar}>
      <NavItem hint="하단바 4개 중 첫번째 항목" title="홈" onPress={() => navigation.navigate('Home')} />
      <NavItem hint="하단바 4개 중 두번째 항목" title="바코드" onPress={() => navigation.navigate('BarcodeReader')} />
      <NavItem hint="하단바 4개 중 세번째 항목" title="OCR" onPress={() => navigation.navigate('OCRModeScreen')} />
      <NavItem hint="하단바 4개 중 네번째 항목" title="마이페이지" onPress={() => navigation.navigate('MyPage')} />
    </View>
  );
};

interface NavItemProps {
  title: string;
  onPress: () => void;
  hint: string;
}

const NavItem: React.FC<NavItemProps> = ({ title, onPress, hint }) => (
  <TouchableOpacity accessibilityHint={hint} style={styles.navItem} onPress={onPress}>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
  },
  navText: {
   color:"#000000",
    fontSize: 15,
  },
});

export default Navbar;