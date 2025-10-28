import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RoleSelectionScreen() {
  const router = useRouter();

  const handleUserSelection = () => {
    router.push('/auth/login');
  };

  const handleOwnerSelection = () => {
    router.push('/turf-owner-login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>Select how you want to use Sporto</Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.card} onPress={handleUserSelection}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="person" size={60} color="#4CAF50" />
          </View>
          <Text style={styles.cardTitle}>User</Text>
          <Text style={styles.cardDescription}>
            Book turfs, manage bookings, and play sports
          </Text>
          <View style={styles.arrowContainer}>
            <MaterialIcons name="arrow-forward" size={24} color="#4CAF50" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleOwnerSelection}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="business" size={60} color="#FF6B6B" />
          </View>
          <Text style={styles.cardTitle}>Turf Owner</Text>
          <Text style={styles.cardDescription}>
            Manage your turf, bookings, and grow your business
          </Text>
          <View style={styles.arrowContainer}>
            <MaterialIcons name="arrow-forward" size={24} color="#FF6B6B" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: height * 0.1,
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  arrowContainer: {
    position: 'absolute',
    right: 20,
    top: '50%',
  },
});