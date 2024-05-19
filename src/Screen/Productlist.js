import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, selectCartItems} from '../Store/CartSlice';
import {useNavigation} from '@react-navigation/native';
import Cart from './CartItems'; // Ensure you have the correct import for the Cart component
import SliderComponents from '../Component/SliderComponent/SliderComponent';
import fonts from '../assets/fonts';

const ProductListingScreen = () => {
  const navigation = useNavigation();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imaged = [
    require('../assets/ads.png'),
    require('../assets/ads.png'),
    require('../assets/ads.png'),
  ];
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const getProduct = () => {
    const URL = 'https://fakestoreapi.com/products';

    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setLoading(false);
        setError(error.message);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleAddToCart = item => {
    dispatch(addToCart({...item, quantity: 1}));
  };

  const handlePress = item => {
    navigation.navigate('ProductDetail', {product: item});
  };

  const ProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}>
      <Image
        source={{uri: item.image}}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.productInfo}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>
            {item.title.split(' ').slice(0, 2).join(' ')}
          </Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(item)}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View> 
          <Image
            source={require('../assets/logo.jpg')}
            resizeMode="cover"
            style={styles.img}
          />
        </View>
        <SliderComponents images={imaged} />
        {loading ? (
          <ActivityIndicator color="black" size="large" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View>
            <Text style={styles.txt}>Trending Items</Text>
           
            <FlatList
              showsVerticalScrollIndicator={false}
              data={product}
              numColumns={2}
              keyExtractor={(item, index) => item.id.toString() + index}
              renderItem={({item}) => <ProductItem item={item} />}
            />
          </View>
        )}
      </ScrollView>
      <Cart style={styles.cart} />  
    </View>
  );
};

export default ProductListingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  heading: {
    color: 'black',
    fontSize: 24,
    marginHorizontal: 15,
    fontFamily: fonts.lightInter,
    marginTop: 7,
    marginBottom: 5,
    fontWeight: '700',
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  productContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 15,
    marginHorizontal: 6,
    width: '48%',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.9,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  productImage: {
    width: '60%',
    marginTop: 10,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    aspectRatio: 1,
  },
  img: {
    width: 180,
    height: 60,
    alignSelf: 'center', 
  },
  productInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  price: {
    fontSize: 14,
    color: 'black',
  },
  addButton: {
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addButtonText: {
    color: 'black',
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: '500',
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 40,
    alignSelf: 'center',
  },
  txt: {
    fontSize: 20,
    marginLeft: 10,
    color: 'black',
    fontWeight: '600',
  },
  cart: {
    
  },
});
