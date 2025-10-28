import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface Booking {
  id: string;
  turfName: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  duration: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  playersCount: number;
  sport: string;
}

const ALL_BOOKINGS: Booking[] = [
  {
    id: '1',
    turfName: 'Green Valley Cricket Turf',
    customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210',
    date: '2025-10-24',
    time: '6:00 PM - 8:00 PM',
    duration: '2 hours',
    amount: 2400,
    status: 'confirmed',
    playersCount: 11,
    sport: 'Cricket',
  },
  {
    id: '2',
    turfName: 'Champions Cricket Ground',
    customerName: 'Priya Patel',
    customerPhone: '+91 98765 43211',
    date: '2025-10-25',
    time: '7:00 AM - 9:00 AM',
    duration: '2 hours',
    amount: 3200,
    status: 'pending',
    playersCount: 11,
    sport: 'Cricket',
  },
  {
    id: '3',
    turfName: 'Sports Arena',
    customerName: 'Amit Kumar',
    customerPhone: '+91 98765 43212',
    date: '2025-10-24',
    time: '4:00 PM - 6:00 PM',
    duration: '2 hours',
    amount: 2000,
    status: 'completed',
    playersCount: 8,
    sport: 'Cricket',
  },
  {
    id: '4',
    turfName: 'Pro Cricket Club',
    customerName: 'Sneha Reddy',
    customerPhone: '+91 98765 43213',
    date: '2025-10-26',
    time: '5:00 PM - 7:00 PM',
    duration: '2 hours',
    amount: 2800,
    status: 'confirmed',
    playersCount: 11,
    sport: 'Cricket',
  },
  {
    id: '5',
    turfName: 'Green Valley Cricket Turf',
    customerName: 'Vijay Singh',
    customerPhone: '+91 98765 43214',
    date: '2025-10-23',
    time: '3:00 PM - 5:00 PM',
    duration: '2 hours',
    amount: 2400,
    status: 'completed',
    playersCount: 10,
    sport: 'Cricket',
  },
  {
    id: '6',
    turfName: 'Champions Cricket Ground',
    customerName: 'Ravi Patel',
    customerPhone: '+91 98765 43215',
    date: '2025-10-22',
    time: '6:00 PM - 8:00 PM',
    duration: '2 hours',
    amount: 3200,
    status: 'cancelled',
    playersCount: 11,
    sport: 'Cricket',
  },
];

export default function BookingsScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'completed':
        return '#2196F3';
      case 'cancelled':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const handleConfirmBooking = (bookingId: string) => {
    Alert.alert(
      'Confirm Booking',
      'Are you sure you want to confirm this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => Alert.alert('Success', 'Booking confirmed successfully!'),
        },
      ]
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => Alert.alert('Cancelled', 'Booking has been cancelled.'),
        },
      ]
    );
  };

  const handleContactCustomer = (phone: string, name: string) => {
    Alert.alert('Contact Customer', `Call ${name} at ${phone}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Call', onPress: () => {} },
    ]);
  };

  const filteredBookings = ALL_BOOKINGS.filter((booking) => {
    const matchesStatus =
      selectedFilter === 'all' || booking.status === selectedFilter;
    const matchesSearch =
      !searchQuery ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.turfName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getFilterCount = (status: string) => {
    if (status === 'all') return ALL_BOOKINGS.length;
    return ALL_BOOKINGS.filter((b) => b.status === status).length;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookings Management</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by customer or turf name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Status Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        <TouchableOpacity
          style={[styles.filterChip, selectedFilter === 'all' && styles.filterChipActive]}
          onPress={() => setSelectedFilter('all')}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'all' && styles.filterChipTextActive,
            ]}
          >
            All ({getFilterCount('all')})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            selectedFilter === 'pending' && styles.filterChipActive,
          ]}
          onPress={() => setSelectedFilter('pending')}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'pending' && styles.filterChipTextActive,
            ]}
          >
            Pending ({getFilterCount('pending')})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            selectedFilter === 'confirmed' && styles.filterChipActive,
          ]}
          onPress={() => setSelectedFilter('confirmed')}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'confirmed' && styles.filterChipTextActive,
            ]}
          >
            Confirmed ({getFilterCount('confirmed')})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            selectedFilter === 'completed' && styles.filterChipActive,
          ]}
          onPress={() => setSelectedFilter('completed')}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'completed' && styles.filterChipTextActive,
            ]}
          >
            Completed ({getFilterCount('completed')})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            selectedFilter === 'cancelled' && styles.filterChipActive,
          ]}
          onPress={() => setSelectedFilter('cancelled')}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'cancelled' && styles.filterChipTextActive,
            ]}
          >
            Cancelled ({getFilterCount('cancelled')})
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bookings List */}
      <ScrollView style={styles.bookingsList} showsVerticalScrollIndicator={false}>
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              {/* Status Badge */}
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: `${getStatusColor(booking.status)}20` },
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(booking.status) },
                  ]}
                />
                <Text
                  style={[styles.statusText, { color: getStatusColor(booking.status) }]}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Text>
              </View>

              {/* Booking Info */}
              <Text style={styles.turfName}>{booking.turfName}</Text>
              <View style={styles.customerRow}>
                <Ionicons name="person" size={16} color="#666" />
                <Text style={styles.customerName}>{booking.customerName}</Text>
              </View>

              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar" size={16} color="#666" />
                  <Text style={styles.detailText}>{booking.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="time" size={16} color="#666" />
                  <Text style={styles.detailText}>{booking.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="people" size={16} color="#666" />
                  <Text style={styles.detailText}>{booking.playersCount} players</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="sports-cricket" size={16} color="#666" />
                  <Text style={styles.detailText}>{booking.sport}</Text>
                </View>
              </View>

              {/* Amount */}
              <View style={styles.amountRow}>
                <Text style={styles.amountLabel}>Total Amount</Text>
                <Text style={styles.amountValue}>₹{booking.amount}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() =>
                    handleContactCustomer(booking.customerPhone, booking.customerName)
                  }
                >
                  <Ionicons name="call" size={18} color="#2196F3" />
                  <Text style={styles.callButtonText}>Call</Text>
                </TouchableOpacity>

                {booking.status === 'pending' && (
                  <>
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => handleConfirmBooking(booking.id)}
                    >
                      <MaterialIcons name="check-circle" size={18} color="#fff" />
                      <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleCancelBooking(booking.id)}
                    >
                      <MaterialIcons name="cancel" size={18} color="#F44336" />
                    </TouchableOpacity>
                  </>
                )}

                {booking.status === 'confirmed' && (
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => Alert.alert('Details', 'View booking details')}
                  >
                    <MaterialIcons name="visibility" size={18} color="#fff" />
                    <Text style={styles.viewButtonText}>View Details</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="event-busy" size={80} color="#ccc" />
            <Text style={styles.emptyText}>No Bookings Found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your filters or search query
            </Text>
          </View>
        )}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  filterButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterChipActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  filterChipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  bookingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  turfName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  customerName: {
    fontSize: 15,
    color: '#666',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: '47%',
  },
  detailText: {
    fontSize: 13,
    color: '#666',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  amountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  callButtonText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  confirmButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});
