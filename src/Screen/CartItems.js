import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectCartItems} from '../Store/CartSlice';
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const itemCount = cartItems.length;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('itemList')}
      style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.text}>{itemCount}</Text>
      </View>
      <Image source={require('../assets/store.png')} style={styles.image} />
    </TouchableOpacity>
  );
};
export default Cart;

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    tintColor: 'white',
    alignSelf: 'center',
  },
  item: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    fontWeight: '500',
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'flex-end',
 
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  container: {
    position: 'absolute',
    bottom: 70,
    right: 30,
    zIndex: 1000,
    width: 60,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 30,
  },
});
