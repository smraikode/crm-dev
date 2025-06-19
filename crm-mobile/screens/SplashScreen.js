import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { View } from 'dripsy';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  // Animated values
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate: fade-in + scale + slight rotation bounce
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1200,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      sx={{
        flex: 1,
        bg: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.Image
        source={require('../assets/logo.png')}
        style={{
          width: 260,
          height: 260,
          opacity,
          transform: [{ scale }, { rotate: rotation }],
        }}
        resizeMode="contain"
      />
    </View>
  );
}
