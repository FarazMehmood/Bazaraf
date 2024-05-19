
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { wp } from '../../utils/Dimensions';

const SliderComponents = ({ images }) => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        autoplay={true}
        autoplayTimeout={3}
        loop={true}
        showsPagination={false}
        containerStyle={styles.swiperContainer}
        activeDotColor="transparent"
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default SliderComponents;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor:'white',marginTop:20
  },
  wrapper: {
    backgroundColor:'white'
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor:'white'
  },
  image: {
    width: '96%',
    height: 200,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  swiperContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
