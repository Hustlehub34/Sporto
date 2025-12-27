import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AuthOptionsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.backgroundPattern}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Player! 🎮</Text>
          <Text style={styles.subtitle}>
            Choose an option to continue
          </Text>
        </View>

        {/* Options Container */}
        <View style={styles.optionsContainer}>
          {/* Create Account Card */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => router.push('/auth/signup')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
              style={styles.cardGloss}
            />

            <View style={styles.optionContent}>
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.iconContainer}
              >
                <Ionicons name="person-add" size={40} color="#FFF" />
              </LinearGradient>

              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Create Account</Text>
                <Text style={styles.optionDescription}>
                  New to Spoortx? Register now
                </Text>
              </View>

              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.arrowButton}
              >
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </LinearGradient>
            </View>
          </TouchableOpacity>

          {/* Login Card */}
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => router.push('/auth/login')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
              style={styles.cardGloss}
            />

            <View style={styles.optionContent}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.iconContainer}
              >
                <Ionicons name="log-in" size={40} color="#FFF" />
              </LinearGradient>

              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Login</Text>
                <Text style={styles.optionDescription}>
                  Already have an account? Sign in
                </Text>
              </View>

              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.arrowButton}
              >
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundPattern: {
    flex: 1,
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: 100,
    left: -50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 50,
    marginBottom: 20,
  },
  header: {
    marginTop: height * 0.1,
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  optionCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  cardGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    zIndex: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
});
