import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [paymentMethod, setPaymentMethod] = useState<'advance' | 'full'>('advance');
  const [couponCode, setCouponCode] = useState('');

  const slotPrice = parseInt(params.price as string) || 400;
  const duration = parseFloat(params.duration as string) || 2;
  const totalSlotPrice = slotPrice * duration;
  const discount = 0;
  const payableAtVenue = paymentMethod === 'advance' ? 200 : 0;
  const advanceAmount = paymentMethod === 'advance' ? 200 : 0;
  const convenienceFee = 700;
  const payableAmount = paymentMethod === 'advance' ? advanceAmount + convenienceFee : totalSlotPrice + convenienceFee;

  const handleProceedToPay = () => {
    Alert.alert(
      'Payment',
      `Processing payment of ₹${payableAmount}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Booking confirmed!', [
              {
                text: 'OK',
                onPress: () => router.push('/(dashboard)/bookings'),
              },
            ]);
          },
        },
      ]
    );
  };

  const handleApplyCoupon = () => {
    if (couponCode) {
      Alert.alert('Coupon', 'Coupon applied successfully!');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout Summary</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Booking Details Card */}
        <View style={styles.bookingCard}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/100x80/4CAF50/ffffff?text=Turf',
            }}
            style={styles.turfImage}
          />
          <View style={styles.bookingInfo}>
            <Text style={styles.turfName} numberOfLines={2}>
              {params.turfName || 'Battledoor Sadminton Academy'}
            </Text>
            <View style={styles.bookingDetail}>
              <MaterialIcons name="sports-cricket" size={14} color="#666" />
              <Text style={styles.detailText}>Cricket</Text>
            </View>
            <View style={styles.bookingDetail}>
              <MaterialIcons name="calendar-today" size={14} color="#666" />
              <Text style={styles.detailText}>{params.date || '9 June 2024'}</Text>
            </View>
            <View style={styles.bookingDetail}>
              <MaterialIcons name="access-time" size={14} color="#666" />
              <Text style={styles.detailText}>
                {params.startTime || '4 PM'} - {params.duration || '2'} hrs
              </Text>
            </View>
          </View>
        </View>

        {/* Coupon Section */}
        <View style={styles.couponSection}>
          <View style={styles.couponInputContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Apply Coupon"
              value={couponCode}
              onChangeText={setCouponCode}
            />
            <TouchableOpacity style={styles.coinsButton}>
              <Ionicons name="diamond" size={18} color="#FF9800" />
              <Text style={styles.coinsText}>Coins</Text>
              <MaterialIcons name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          {couponCode && (
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyCoupon}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod('advance')}
          >
            <View style={styles.radioButton}>
              {paymentMethod === 'advance' && (
                <View style={styles.radioButtonSelected} />
              )}
            </View>
            <View style={styles.paymentOptionContent}>
              <Text style={styles.paymentOptionTitle}>Advance payment</Text>
              <Text style={styles.paymentOptionSubtitle}>(INR 100 per hour)</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.paymentOption}
            onPress={() => setPaymentMethod('full')}
          >
            <View style={styles.radioButton}>
              {paymentMethod === 'full' && (
                <View style={styles.radioButtonSelected} />
              )}
            </View>
            <View style={styles.paymentOptionContent}>
              <Text style={styles.paymentOptionTitle}>Full Payment</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Slot Price</Text>
            <Text style={styles.priceValue}>INR {totalSlotPrice}</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Offer Discount</Text>
            <Text style={styles.priceValue}>INR {discount}</Text>
          </View>

          {paymentMethod === 'advance' && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Payable at Venue</Text>
              <Text style={styles.priceValue}>INR {payableAtVenue}</Text>
            </View>
          )}

          {paymentMethod === 'advance' && (
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Advance Amount</Text>
              <Text style={styles.priceValue}>INR {advanceAmount}</Text>
            </View>
          )}

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Convenience Fee</Text>
            <Text style={styles.priceValue}>INR {convenienceFee}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Payable Amount</Text>
            <Text style={styles.totalValue}>INR {payableAmount}</Text>
          </View>
        </View>

        {/* Cancellation Policy */}
        <TouchableOpacity style={styles.policyButton}>
          <MaterialIcons name="info-outline" size={20} color="#FF9800" />
          <Text style={styles.policyText}>Read Cancellation Policy</Text>
        </TouchableOpacity>

        {/* Proceed Button */}
        <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToPay}>
          <Text style={styles.proceedButtonText}>Proceed to Pay</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  turfImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  bookingInfo: {
    flex: 1,
    gap: 6,
  },
  turfName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
  couponSection: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  couponInputContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  couponInput: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  coinsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 12,
    gap: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  coinsText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  applyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF9800',
  },
  paymentOptionContent: {
    flex: 1,
  },
  paymentOptionTitle: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  paymentOptionSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  policyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    marginHorizontal: 20,
  },
  policyText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '500',
  },
  proceedButton: {
    backgroundColor: '#FF9800',
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});