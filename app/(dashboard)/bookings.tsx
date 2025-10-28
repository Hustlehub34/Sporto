import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Booking {
  id: string;
  name: string;
  type: 'event' | 'turf';
  image: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  sport: string;
  bookingId: string;
  paymentMethod: string;
}

const ALL_BOOKINGS: Booking[] = [
  {
    id: '1',
    name: 'Weekend Football Tournament',
    type: 'event',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    location: 'Koramangala, Bangalore',
    date: '2 Nov 2025',
    time: '10:00 AM',
    duration: '8 hours',
    price: 500,
    status: 'upcoming',
    sport: 'Football',
    bookingId: 'BK001',
    paymentMethod: 'UPI',
  },
  {
    id: '2',
    name: 'Green Field Sports Complex',
    type: 'turf',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
    location: 'Koramangala, Bangalore',
    date: '28 Oct 2025',
    time: '6:00 PM',
    duration: '1 hour',
    price: 800,
    status: 'upcoming',
    sport: 'Football',
    bookingId: 'BK002',
    paymentMethod: 'Card',
  },
  {
    id: '3',
    name: 'Basketball 3x3 Championship',
    type: 'event',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    location: 'Whitefield, Bangalore',
    date: '8 Nov 2025',
    time: '4:00 PM',
    duration: '5 hours',
    price: 600,
    status: 'upcoming',
    sport: 'Basketball',
    bookingId: 'BK003',
    paymentMethod: 'Wallet',
  },
  {
    id: '4',
    name: 'Champions Arena',
    type: 'turf',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
    location: 'HSR Layout, Bangalore',
    date: '30 Oct 2025',
    time: '7:00 PM',
    duration: '2 hours',
    price: 1000,
    status: 'upcoming',
    sport: 'Basketball',
    bookingId: 'BK004',
    paymentMethod: 'UPI',
  },
  {
    id: '5',
    name: 'Victory Grounds',
    type: 'turf',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
    location: 'Indiranagar, Bangalore',
    date: '20 Oct 2025',
    time: '5:00 PM',
    duration: '1 hour',
    price: 700,
    status: 'completed',
    sport: 'Cricket',
    bookingId: 'BK005',
    paymentMethod: 'Card',
  },
  {
    id: '6',
    name: 'Cricket Premier League',
    type: 'event',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    location: 'HSR Layout, Bangalore',
    date: '18 Oct 2025',
    time: '8:00 AM',
    duration: '11 hours',
    price: 800,
    status: 'completed',
    sport: 'Cricket',
    bookingId: 'BK006',
    paymentMethod: 'Wallet',
  },
  {
    id: '7',
    name: 'Sports Hub Premium',
    type: 'turf',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
    location: 'Whitefield, Bangalore',
    date: '15 Oct 2025',
    time: '6:00 PM',
    duration: '1 hour',
    price: 1200,
    status: 'completed',
    sport: 'Football',
    bookingId: 'BK007',
    paymentMethod: 'UPI',
  },
  {
    id: '8',
    name: 'Green Field Sports Complex',
    type: 'turf',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
    location: 'Koramangala, Bangalore',
    date: '10 Oct 2025',
    time: '7:00 PM',
    duration: '1 hour',
    price: 800,
    status: 'cancelled',
    sport: 'Football',
    bookingId: 'BK008',
    paymentMethod: 'Card',
  },
];

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [bookings, setBookings] = useState(ALL_BOOKINGS);

  const filteredBookings = bookings.filter(booking => booking.status === activeTab);

  const handleCancelBooking = (booking: Booking) => {
    const refundAmount = Math.floor(booking.price * 0.75);

    Alert.alert(
      'Cancel Booking? ⚠️',
      `Are you sure you want to cancel this booking?\n\n${booking.name}\nDate: ${booking.date}\n\n💰 Refund Details:\nTotal Amount: ₹${booking.price}\nRefund Amount: ₹${refundAmount} (75% of total)\nProcessing Fee: ₹${booking.price - refundAmount}\n\nRefund will be credited to your ${booking.paymentMethod} within 5-7 business days.`,
      [
        {
          text: 'Keep Booking',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            // Update booking status
            setBookings(prevBookings =>
              prevBookings.map(b =>
                b.id === booking.id ? { ...b, status: 'cancelled' as const } : b
              )
            );
            Alert.alert(
              'Booking Cancelled 💔',
              `Your booking has been cancelled successfully.\n\nRefund of ₹${refundAmount} will be credited to your ${booking.paymentMethod} within 5-7 business days.\n\nBooking ID: ${booking.bookingId}`
            );
          },
        },
      ]
    );
  };

  const handleBookAgain = (booking: Booking) => {
    Alert.alert(
      'Book Again 🎉',
      `Would you like to book ${booking.name} again?\n\nLocation: ${booking.location}\nSport: ${booking.sport}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes, Book Now', onPress: () => Alert.alert('Success', 'Redirecting to booking...') },
      ]
    );
  };

  const getStatusGradient = (status: string): [string, string] => {
    switch (status) {
      case 'upcoming':
        return ['#4CAF50', '#45a049'];
      case 'completed':
        return ['#2196F3', '#1976D2'];
      case 'cancelled':
        return ['#F44336', '#D32F2F'];
      default:
        return ['#999', '#777'];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'time-outline';
      case 'completed':
        return 'checkmark-circle-outline';
      case 'cancelled':
        return 'close-circle-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const renderBookingCard = (booking: Booking) => (
    <View key={booking.id} style={styles.bookingCard3D}>
      <View style={styles.bookingCardInner}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <Image source={{ uri: booking.image }} style={styles.bookingImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />

          {/* Type Badge */}
          <View style={styles.typeBadgeContainer}>
            <LinearGradient
              colors={booking.type === 'event' ? ['#FF9800', '#F57C00'] : ['#667eea', '#764ba2']}
              style={styles.typeBadge}
            >
              <Ionicons
                name={booking.type === 'event' ? 'trophy' : 'business'}
                size={14}
                color="#fff"
              />
              <Text style={styles.typeBadgeText}>
                {booking.type === 'event' ? 'Event' : 'Turf'}
              </Text>
            </LinearGradient>
          </View>

          {/* Status Badge */}
          <View style={styles.statusBadgeContainer}>
            <LinearGradient
              colors={getStatusGradient(booking.status)}
              style={styles.statusBadge}
            >
              <Ionicons name={getStatusIcon(booking.status) as any} size={16} color="#fff" />
              <Text style={styles.statusBadgeText}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.bookingName} numberOfLines={2}>
            {booking.name}
          </Text>

          {/* Details Grid */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Ionicons name="location" size={16} color="#667eea" />
              </View>
              <Text style={styles.detailText} numberOfLines={1}>
                {booking.location}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Ionicons name="calendar" size={16} color="#667eea" />
              </View>
              <Text style={styles.detailText}>{booking.date}</Text>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Ionicons name="time" size={16} color="#667eea" />
              </View>
              <Text style={styles.detailText}>
                {booking.time} • {booking.duration}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Ionicons name="basketball" size={16} color="#667eea" />
              </View>
              <Text style={styles.detailText}>{booking.sport}</Text>
            </View>
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <View style={styles.priceSection}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.priceGradient}
              >
                <Text style={styles.priceLabel}>Amount Paid</Text>
                <Text style={styles.priceValue}>₹{booking.price}</Text>
                <Text style={styles.bookingIdText}>ID: {booking.bookingId}</Text>
              </LinearGradient>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              {booking.status === 'upcoming' && (
                <>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancelBooking(booking)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#F44336', '#D32F2F']}
                      style={styles.cancelButtonGradient}
                    >
                      <Ionicons name="close-circle" size={18} color="#fff" />
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.viewButton}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#4CAF50', '#45a049']}
                      style={styles.viewButtonGradient}
                    >
                      <Ionicons name="eye" size={18} color="#fff" />
                      <Text style={styles.viewButtonText}>Details</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}

              {(booking.status === 'completed' || booking.status === 'cancelled') && (
                <TouchableOpacity
                  style={styles.bookAgainButton}
                  onPress={() => handleBookAgain(booking)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.bookAgainGradient}
                  >
                    <Ionicons name="refresh" size={18} color="#fff" />
                    <Text style={styles.bookAgainText}>Book Again</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      {/* Gradient Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>My Bookings 📋</Text>
            <Text style={styles.headerSubtitle}>Manage all your bookings</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)']}
              style={styles.statCardGradient}
            >
              <Ionicons name="time" size={24} color="#fff" />
              <Text style={styles.statNumber}>
                {bookings.filter(b => b.status === 'upcoming').length}
              </Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)']}
              style={styles.statCardGradient}
            >
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.statNumber}>
                {bookings.filter(b => b.status === 'completed').length}
              </Text>
              <Text style={styles.statLabel}>Completed</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient
              colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)']}
              style={styles.statCardGradient}
            >
              <Ionicons name="close-circle" size={24} color="#fff" />
              <Text style={styles.statNumber}>
                {bookings.filter(b => b.status === 'cancelled').length}
              </Text>
              <Text style={styles.statLabel}>Cancelled</Text>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
          onPress={() => setActiveTab('upcoming')}
          activeOpacity={0.8}
        >
          {activeTab === 'upcoming' ? (
            <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.tabGradient}>
              <Ionicons name="time" size={18} color="#fff" />
              <Text style={styles.tabTextActive}>Upcoming</Text>
            </LinearGradient>
          ) : (
            <>
              <Ionicons name="time-outline" size={18} color="#666" />
              <Text style={styles.tabText}>Upcoming</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          onPress={() => setActiveTab('completed')}
          activeOpacity={0.8}
        >
          {activeTab === 'completed' ? (
            <LinearGradient colors={['#2196F3', '#1976D2']} style={styles.tabGradient}>
              <Ionicons name="checkmark-circle" size={18} color="#fff" />
              <Text style={styles.tabTextActive}>Completed</Text>
            </LinearGradient>
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={18} color="#666" />
              <Text style={styles.tabText}>Completed</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'cancelled' && styles.tabActive]}
          onPress={() => setActiveTab('cancelled')}
          activeOpacity={0.8}
        >
          {activeTab === 'cancelled' ? (
            <LinearGradient colors={['#F44336', '#D32F2F']} style={styles.tabGradient}>
              <Ionicons name="close-circle" size={18} color="#fff" />
              <Text style={styles.tabTextActive}>Cancelled</Text>
            </LinearGradient>
          ) : (
            <>
              <Ionicons name="close-circle-outline" size={18} color="#666" />
              <Text style={styles.tabText}>Cancelled</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.bookingsList}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map(renderBookingCard)
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.emptyIconGradient}
                >
                  <Ionicons
                    name={
                      activeTab === 'upcoming'
                        ? 'calendar-outline'
                        : activeTab === 'completed'
                        ? 'checkmark-done-outline'
                        : 'close-circle-outline'
                    }
                    size={60}
                    color="#fff"
                  />
                </LinearGradient>
              </View>
              <Text style={styles.emptyText}>
                No {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Bookings
              </Text>
              <Text style={styles.emptySubtext}>
                {activeTab === 'upcoming'
                  ? 'Book an event or turf to see it here'
                  : activeTab === 'completed'
                  ? 'Your completed bookings will appear here'
                  : 'Cancelled bookings will be shown here'}
              </Text>
            </View>
          )}
        </View>
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
    paddingTop: 45,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statCardGradient: {
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  tabActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  tabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  bookingsList: {
    padding: 20,
  },
  bookingCard3D: {
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ perspective: 1000 }],
  },
  bookingCardInner: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageSection: {
    height: 180,
    position: 'relative',
  },
  bookingImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  typeBadgeContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  statusBadgeContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  contentSection: {
    padding: 16,
  },
  bookingName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  detailsContainer: {
    gap: 10,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  detailIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  footerSection: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  priceSection: {
    marginBottom: 12,
  },
  priceGradient: {
    borderRadius: 12,
    padding: 12,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  priceLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
  },
  bookingIdText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#F44336',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  cancelButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  viewButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  viewButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  bookAgainButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  bookAgainGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  bookAgainText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    marginBottom: 20,
    borderRadius: 50,
    overflow: 'hidden',
  },
  emptyIconGradient: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
