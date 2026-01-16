import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function SplashScreenComponent() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      // Hide splash screen
      await SplashScreen.hideAsync();
      // Navigate to role selection
      router.replace('/roleSelection');
    }, );

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
});