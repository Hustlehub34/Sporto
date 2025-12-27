import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function TurfOwnerRegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [enquirySent, setEnquirySent] = useState(false);

  const handleSendEnquiry = () => {
    if (!name.trim() || !contact.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (contact.length < 10) {
      Alert.alert('Error', 'Please enter a valid contact number');
      return;
    }
    setEnquirySent(true);
    Alert.alert('Success! 🎉', 'Your enquiry has been sent. Our team will contact you soon!');
  };

  const handleLogin = () => {
    if (!loginId.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Login functionality will be available soon!');
    // router.push('/turf-owner-dashboard');
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
          <View style={[styles.circle, styles.circle3]} />
        </View>
      </LinearGradient>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Partner with Spoortx</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* About Spoortx Card */}
        <View style={styles.infoCard}>
          <LinearGradient
            colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
            style={styles.cardGloss}
          />

          <View style={styles.iconHeader}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.iconBadge}
            >
              <Ionicons name="trophy" size={32} color="#FFF" />
            </LinearGradient>
          </View>

          <Text style={styles.infoTitle}>About Spoortx 🏆</Text>

          <View style={styles.infoDivider} />

          <View style={styles.infoContent}>
            <View style={styles.infoItem}>
              <View style={styles.bulletPoint}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.infoText}>
                <Text style={styles.infoBold}>India's Leading</Text> sports turf booking platform
              </Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.bulletPoint}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.infoText}>
                <Text style={styles.infoBold}>10,000+</Text> active users booking turfs monthly
              </Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.bulletPoint}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.infoText}>
                <Text style={styles.infoBold}>Maximize Revenue</Text> with our smart booking system
              </Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.bulletPoint}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.infoText}>
                <Text style={styles.infoBold}>24/7 Support</Text> for all partner turfs
              </Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.bulletPoint}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              </View>
              <Text style={styles.infoText}>
                <Text style={styles.infoBold}>Zero Commission</Text> for the first 3 months
              </Text>
            </View>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimerBox}>
            <Ionicons name="information-circle" size={20} color="#FF9800" />
            <Text style={styles.disclaimerText}>
              <Text style={styles.disclaimerBold}>Note:</Text> Partnership subject to verification.
              We'll review your turf details and get back to you within 48 hours.
            </Text>
          </View>
        </View>

        {!enquirySent ? (
          /* Enquiry Form */
          <View style={styles.formCard}>
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
              style={styles.cardGloss}
            />

            <View style={styles.formHeader}>
              <Ionicons name="send" size={24} color="#667eea" />
              <Text style={styles.formTitle}>Send Enquiry</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person" size={20} color="#667eea" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contact Number</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call" size={20} color="#667eea" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your contact number"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={contact}
                  onChangeText={setContact}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSendEnquiry}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.submitGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.submitButtonText}>Send Enquiry</Text>
                <Ionicons name="send" size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          /* After Enquiry Sent */
          <View style={styles.successCard}>
            <LinearGradient
              colors={['rgba(76,175,80,0.2)', 'rgba(76,175,80,0.1)']}
              style={styles.successGradient}
            >
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
              </View>
              <Text style={styles.successTitle}>Enquiry Sent! ✨</Text>
              <Text style={styles.successMessage}>
                Thank you for your interest! Our team will review your request and contact you within 48 hours.
              </Text>

              {/* Login Link */}
              {!showLogin ? (
                <TouchableOpacity
                  style={styles.loginLink}
                  onPress={() => setShowLogin(true)}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                    style={styles.loginLinkBg}
                  >
                    <Ionicons name="lock-closed" size={18} color="#FFD700" />
                    <Text style={styles.loginLinkText}>
                      Already a partner? Click here to login →
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                /* Login Form */
                <View style={styles.loginForm}>
                  <View style={styles.formDivider} />

                  <Text style={styles.loginFormTitle}>Partner Login</Text>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Login ID</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="person-circle" size={20} color="#667eea" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your login ID"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        value={loginId}
                        onChangeText={setLoginId}
                        autoCapitalize="none"
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="lock-closed" size={20} color="#667eea" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleLogin}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#667eea', '#764ba2']}
                      style={styles.submitGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.submitButtonText}>Login</Text>
                      <Ionicons name="log-in" size={20} color="#FFF" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </LinearGradient>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Questions? Reach us at{' '}
            <Text style={styles.footerLink}>partner@Spoortx.com</Text>
          </Text>
        </View>
      </ScrollView>
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
    bottom: 200,
    left: -50,
  },
  circle3: {
    width: 150,
    height: 150,
    top: height * 0.5,
    right: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  cardGloss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    zIndex: 0,
  },
  iconHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  infoTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoDivider: {
    height: 3,
    backgroundColor: '#667eea',
    borderRadius: 2,
    marginBottom: 20,
    width: '30%',
    alignSelf: 'center',
  },
  infoContent: {
    gap: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bulletPoint: {
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  infoBold: {
    fontWeight: 'bold',
    color: '#667eea',
  },
  disclaimerBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,152,0,0.1)',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    gap: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  disclaimerBold: {
    fontWeight: 'bold',
    color: '#FF9800',
  },
  formCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 25,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  inputGroup: {
    marginBottom: 20,
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
    backgroundColor: 'rgba(102,126,234,0.1)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(102,126,234,0.2)',
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1a1a1a',
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginTop: 10,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  successCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  successGradient: {
    padding: 30,
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  successMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  loginLink: {
    marginTop: 10,
  },
  loginLinkBg: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,215,0,0.3)',
  },
  loginLinkText: {
    fontSize: 13,
    color: '#FFD700',
    fontWeight: '600',
    flex: 1,
  },
  loginForm: {
    width: '100%',
    marginTop: 20,
  },
  formDivider: {
    height: 2,
    backgroundColor: 'rgba(102,126,234,0.2)',
    marginBottom: 20,
  },
  loginFormTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  footerLink: {
    color: '#FFD700',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
