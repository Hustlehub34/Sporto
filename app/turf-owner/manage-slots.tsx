import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface TimeSlot {
  id: string;
  time: string;
  date: string;
  status: 'available' | 'booked' | 'blocked';
  customerName?: string;
  bookingId?: string;
  price: number;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Generate time slots from 6 AM to 11 PM
const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = 6; hour < 23; hour++) {
    const startTime = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    const endTime = `${hour + 1 > 12 ? hour + 1 - 12 : hour + 1}:00 ${hour + 1 >= 12 ? 'PM' : 'AM'}`;
    slots.push(`${startTime} - ${endTime}`);
  }
  return slots;
};

// Generate dates for next 7 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// Mock data - in real app, this would come from API based on turf ID and date
const MOCK_SLOTS: TimeSlot[] = [
  {
    id: '1',
    time: '6:00 AM - 7:00 AM',
    date: new Date().toISOString().split('T')[0],
    status: 'available',
    price: 1200,
  },
  {
    id: '2',
    time: '7:00 AM - 8:00 AM',
    date: new Date().toISOString().split('T')[0],
    status: 'booked',
    customerName: 'Rahul Sharma',
    bookingId: 'BK001',
    price: 1200,
  },
  {
    id: '3',
    time: '8:00 AM - 9:00 AM',
    date: new Date().toISOString().split('T')[0],
    status: 'booked',
    customerName: 'Priya Patel',
    bookingId: 'BK002',
    price: 1200,
  },
  {
    id: '4',
    time: '9:00 AM - 10:00 AM',
    date: new Date().toISOString().split('T')[0],
    status: 'blocked',
    price: 1200,
  },
];

export default function ManageSlotsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const turfName = params.turfName as string || 'Green Valley Cricket Turf';
  const turfId = params.turfId as string || '1';

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState<TimeSlot[]>(MOCK_SLOTS);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // In real app, fetch slots for this date
  };

  const handleSlotPress = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setShowSlotModal(true);
  };

  const handleBlockSlot = () => {
    if (selectedSlot) {
      setSlots(prevSlots =>
        prevSlots.map(s =>
          s.id === selectedSlot.id ? { ...s, status: 'blocked' as const } : s
        )
      );
      setShowSlotModal(false);
      Alert.alert('Success', 'Slot has been blocked');
    }
  };

  const handleUnblockSlot = () => {
    if (selectedSlot) {
      setSlots(prevSlots =>
        prevSlots.map(s =>
          s.id === selectedSlot.id ? { ...s, status: 'available' as const } : s
        )
      );
      setShowSlotModal(false);
      Alert.alert('Success', 'Slot is now available');
    }
  };

  const getSlotForTime = (time: string): TimeSlot | undefined => {
    return slots.find(
      s =>
        s.time === time &&
        s.date === selectedDate.toISOString().split('T')[0]
    );
  };

  const getStatusColor = (status: 'available' | 'booked' | 'blocked') => {
    switch (status) {
      case 'available':
        return '#4CAF50';
      case 'booked':
        return '#FF9800';
      case 'blocked':
        return '#9E9E9E';
    }
  };

  const getStatusIcon = (status: 'available' | 'booked' | 'blocked') => {
    switch (status) {
      case 'available':
        return 'check-circle';
      case 'booked':
        return 'event-busy';
      case 'blocked':
        return 'block';
    }
  };

  const stats = {
    available: slots.filter(s => s.status === 'available').length,
    booked: slots.filter(s => s.status === 'booked').length,
    blocked: slots.filter(s => s.status === 'blocked').length,
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Header */}
      <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{turfName}</Text>
          <Text style={styles.headerSubtitle}>Manage Time Slots</Text>
        </View>
        <TouchableOpacity style={styles.calendarButton}>
          <MaterialIcons name="calendar-today" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#4CAF5015' }]}>
          <MaterialIcons name="check-circle" size={28} color="#4CAF50" />
          <Text style={[styles.statValue, { color: '#4CAF50' }]}>{stats.available}</Text>
          <Text style={styles.statLabel}>Available</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FF980015' }]}>
          <MaterialIcons name="event-busy" size={28} color="#FF9800" />
          <Text style={[styles.statValue, { color: '#FF9800' }]}>{stats.booked}</Text>
          <Text style={styles.statLabel}>Booked</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#9E9E9E15' }]}>
          <MaterialIcons name="block" size={28} color="#9E9E9E" />
          <Text style={[styles.statValue, { color: '#9E9E9E' }]}>{stats.blocked}</Text>
          <Text style={styles.statLabel}>Blocked</Text>
        </View>
      </View>

      {/* Date Selector */}
      <View style={styles.dateSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map((date, index) => {
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCard,
                  isSelected && styles.dateCardSelected,
                ]}
                onPress={() => handleDateSelect(date)}
              >
                <Text
                  style={[
                    styles.dateDay,
                    isSelected && styles.dateDaySelected,
                  ]}
                >
                  {DAYS_OF_WEEK[date.getDay()]}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    isSelected && styles.dateNumberSelected,
                  ]}
                >
                  {date.getDate()}
                </Text>
                <Text
                  style={[
                    styles.dateMonth,
                    isSelected && styles.dateMonthSelected,
                  ]}
                >
                  {date.toLocaleString('default', { month: 'short' })}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Time Slots */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.slotsContainer}>
          {timeSlots.map((time, index) => {
            const slot = getSlotForTime(time);
            const status = slot?.status || 'available';
            const defaultSlot: TimeSlot = {
              id: `slot-${index}`,
              time,
              date: selectedDate.toISOString().split('T')[0],
              status: 'available',
              price: 1200,
            };
            const slotData = slot || defaultSlot;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.slotCard,
                  { borderLeftColor: getStatusColor(status), borderLeftWidth: 4 },
                ]}
                onPress={() => handleSlotPress(slotData)}
                activeOpacity={0.7}
              >
                <View style={styles.slotTime}>
                  <MaterialIcons
                    name="access-time"
                    size={20}
                    color="#666"
                  />
                  <Text style={styles.slotTimeText}>{time}</Text>
                </View>

                <View style={styles.slotDetails}>
                  {status === 'booked' && slot ? (
                    <View style={styles.bookedInfo}>
                      <View style={styles.customerInfo}>
                        <MaterialIcons name="person" size={16} color="#666" />
                        <Text style={styles.customerName}>
                          {slot.customerName}
                        </Text>
                      </View>
                      <Text style={styles.bookingId}>#{slot.bookingId}</Text>
                    </View>
                  ) : (
                    <Text style={styles.slotPrice}>₹{slotData.price}</Text>
                  )}

                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: `${getStatusColor(status)}20` },
                    ]}
                  >
                    <MaterialIcons
                      name={getStatusIcon(status)}
                      size={14}
                      color={getStatusColor(status)}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(status) },
                      ]}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Slot Detail Modal */}
      <Modal
        visible={showSlotModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSlotModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Slot Details</Text>
              <TouchableOpacity onPress={() => setShowSlotModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {selectedSlot && (
              <View style={styles.modalBody}>
                <View style={styles.modalRow}>
                  <MaterialIcons name="access-time" size={24} color="#4CAF50" />
                  <View style={styles.modalRowText}>
                    <Text style={styles.modalLabel}>Time Slot</Text>
                    <Text style={styles.modalValue}>{selectedSlot.time}</Text>
                  </View>
                </View>

                <View style={styles.modalRow}>
                  <MaterialIcons name="event" size={24} color="#4CAF50" />
                  <View style={styles.modalRowText}>
                    <Text style={styles.modalLabel}>Date</Text>
                    <Text style={styles.modalValue}>
                      {new Date(selectedSlot.date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalRow}>
                  <MaterialIcons name="currency-rupee" size={24} color="#4CAF50" />
                  <View style={styles.modalRowText}>
                    <Text style={styles.modalLabel}>Price</Text>
                    <Text style={styles.modalValue}>₹{selectedSlot.price}</Text>
                  </View>
                </View>

                {selectedSlot.status === 'booked' && (
                  <>
                    <View style={styles.modalRow}>
                      <MaterialIcons name="person" size={24} color="#4CAF50" />
                      <View style={styles.modalRowText}>
                        <Text style={styles.modalLabel}>Customer</Text>
                        <Text style={styles.modalValue}>
                          {selectedSlot.customerName}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.modalRow}>
                      <MaterialIcons name="confirmation-number" size={24} color="#4CAF50" />
                      <View style={styles.modalRowText}>
                        <Text style={styles.modalLabel}>Booking ID</Text>
                        <Text style={styles.modalValue}>
                          #{selectedSlot.bookingId}
                        </Text>
                      </View>
                    </View>
                  </>
                )}

                <View
                  style={[
                    styles.modalStatusBadge,
                    { backgroundColor: `${getStatusColor(selectedSlot.status)}20` },
                  ]}
                >
                  <MaterialIcons
                    name={getStatusIcon(selectedSlot.status)}
                    size={20}
                    color={getStatusColor(selectedSlot.status)}
                  />
                  <Text
                    style={[
                      styles.modalStatusText,
                      { color: getStatusColor(selectedSlot.status) },
                    ]}
                  >
                    {selectedSlot.status.toUpperCase()}
                  </Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.modalActions}>
                  {selectedSlot.status === 'available' && (
                    <TouchableOpacity
                      style={[styles.modalButton, styles.blockButton]}
                      onPress={handleBlockSlot}
                    >
                      <MaterialIcons name="block" size={20} color="#fff" />
                      <Text style={styles.modalButtonText}>Block Slot</Text>
                    </TouchableOpacity>
                  )}

                  {selectedSlot.status === 'blocked' && (
                    <TouchableOpacity
                      style={[styles.modalButton, styles.unblockButton]}
                      onPress={handleUnblockSlot}
                    >
                      <MaterialIcons name="check-circle" size={20} color="#fff" />
                      <Text style={styles.modalButtonText}>Unblock Slot</Text>
                    </TouchableOpacity>
                  )}

                  {selectedSlot.status === 'booked' && (
                    <TouchableOpacity
                      style={[styles.modalButton, styles.viewButton]}
                      onPress={() => {
                        setShowSlotModal(false);
                        Alert.alert('Booking Details', 'View full booking details');
                      }}
                    >
                      <MaterialIcons name="visibility" size={20} color="#fff" />
                      <Text style={styles.modalButtonText}>View Booking</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  dateSelector: {
    paddingVertical: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dateCard: {
    width: 70,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginRight: 12,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateCardSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  dateDay: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  dateDaySelected: {
    color: 'rgba(255,255,255,0.9)',
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  dateNumberSelected: {
    color: '#fff',
  },
  dateMonth: {
    fontSize: 11,
    color: '#999',
  },
  dateMonthSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
  },
  slotsContainer: {
    padding: 15,
    gap: 12,
  },
  slotCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  slotTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  slotTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  slotDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookedInfo: {
    flex: 1,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  bookingId: {
    fontSize: 12,
    color: '#999',
  },
  slotPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBody: {
    padding: 20,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
  },
  modalRowText: {
    flex: 1,
  },
  modalLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  modalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modalStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 15,
    borderRadius: 12,
    marginVertical: 15,
  },
  modalStatusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalActions: {
    gap: 12,
    marginTop: 10,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  blockButton: {
    backgroundColor: '#9E9E9E',
  },
  unblockButton: {
    backgroundColor: '#4CAF50',
  },
  viewButton: {
    backgroundColor: '#2196F3',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
