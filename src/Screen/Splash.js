import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('ProductList'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    
      
      <View style={styles.content}>
        <Text style={styles.text}>Bazaraf</Text>
      </View>
  
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black', 
  },
});