import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const STATIC_OTP = "123456"; // Static OTP for testing

export default function SignupScreen() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'otp'>('form');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmitForm = () => {
    // Validate all fields
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!mobile.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    // Show OTP alert and move to OTP verification
    Alert.alert('OTP Sent! 📧', `We've sent an OTP to ${email}\n\nUse: ${STATIC_OTP}`);
    setStep('otp');
  };

  const handleVerifyOTP = () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter OTP');
      return;
    }

    if (otp !== STATIC_OTP) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      return;
    }

    // Success - navigate to dashboard
    Alert.alert('Account Created! 🎉', 'Your account has been created successfully!', [
      { text: 'OK', onPress: () => router.replace('/(dashboard)/home') }
    ]);
  };

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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          {/* Step 1: Registration Form */}
          {step === 'form' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Create Account 🎉</Text>
                <Text style={styles.subtitle}>
                  Fill in your details to get started
                </Text>
              </View>

              <View style={styles.formCard}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                  style={styles.cardGloss}
                />

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="person" size={20} color="#667eea" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your full name"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      value={name}
                      onChangeText={setName}
                      autoCapitalize="words"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email Address</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="mail" size={20} color="#667eea" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Mobile Number</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="call" size={20} color="#667eea" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="10-digit mobile number"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      value={mobile}
                      onChangeText={setMobile}
                      keyboardType="phone-pad"
                      maxLength={10}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed" size={20} color="#667eea" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Create a strong password"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmitForm}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#4CAF50', '#45a049']}
                    style={styles.submitGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.submitButtonText}>Continue</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFF" />
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.helperText}>
                  <Ionicons name="information-circle" size={16} color="#666" />
                  <Text style={styles.helperTextLabel}>
                    We'll send a verification code to your email
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <>
              <View style={styles.header}>
                <Text style={styles.title}>Verify OTP 📧</Text>
                <Text style={styles.subtitle}>
                  Enter the code sent to {email}
                </Text>
              </View>

              <View style={styles.formCard}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                  style={styles.cardGloss}
                />

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Enter OTP</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed" size={20} color="#667eea" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="6-digit OTP"
                      placeholderTextColor="rgba(0,0,0,0.4)"
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleVerifyOTP}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.submitGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.submitButtonText}>Verify & Create Account</Text>
                    <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.resendLink}
                  onPress={() => setStep('form')}
                >
                  <Text style={styles.resendText}>Go Back to Form</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our Terms & Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 50,
    marginBottom: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: 24,
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
  inputGroup: {
    marginBottom: 20,
    zIndex: 2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    borderRadius: 12,
    height: 55,
    overflow: 'hidden',
    marginTop: 10,
    zIndex: 2,
  },
  submitGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  helperText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 6,
    zIndex: 2,
  },
  helperTextLabel: {
    fontSize: 12,
    color: '#666',
  },
  resendLink: {
    alignItems: 'center',
    marginTop: 20,
    zIndex: 2,
  },
  resendText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
});
