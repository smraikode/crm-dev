import React, { useEffect } from 'react';
import { Image, Dimensions } from 'react-native';
import { View } from 'dripsy';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000); // You can adjust this time

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      sx={{
        flex: 1,
        bg: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../assets/logo.png')}
        style={{
          width: 260,
          height: 260,
        }}
        resizeMode="contain"
      />
    </View>
  );
}
