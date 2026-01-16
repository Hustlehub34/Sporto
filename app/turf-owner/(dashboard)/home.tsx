import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface Turf {
  id: string;
  name: string;
  location: string;
  type: string;
  price: number;
  isActive: boolean;
  todayBookings: number;
  totalRevenue: number;
}

interface RecentBooking {
  id: string;
  turfName: string;
  customerName: string;
  date: string;
  time: string;
  amount: number;
  status: 'confirmed' | 'pending' | 'completed';
}

const MY_TURFS: Turf[] = [
  {
    id: '1',
    name: 'Green Valley Cricket Turf',
    location: 'Sector 12, Mumbai',
    type: 'Cricket',
    price: 1200,
    isActive: true,
    todayBookings: 5,
    totalRevenue: 18500,
  },
  {
    id: '2',
    name: 'Champions Football Ground',
    location: 'Andheri West, Mumbai',
    type: 'Football',
    price: 1500,
    isActive: true,
    todayBookings: 3,
    totalRevenue: 12300,
  },
  {
    id: '3',
    name: 'Sports Arena Badminton',
    location: 'Bandra, Mumbai',
    type: 'Badminton',
    price: 800,
    isActive: false,
    todayBookings: 0,
    totalRevenue: 8900,
  },
];

const RECENT_BOOKINGS: RecentBooking[] = [
  {
    id: '1',
    turfName: 'Green Valley Cricket Turf',
    customerName: 'Rahul Sharma',
    date: '2025-12-28',
    time: '6:00 PM - 8:00 PM',
    amount: 2400,
    status: 'confirmed',
  },
  {
    id: '2',
    turfName: 'Champions Football Ground',
    customerName: 'Priya Patel',
    date: '2025-12-28',
    time: '7:00 AM - 9:00 AM',
    amount: 3200,
    status: 'pending',
  },
  {
    id: '3',
    turfName: 'Green Valley Cricket Turf',
    customerName: 'Amit Kumar',
    date: '2025-12-27',
    time: '4:00 PM - 6:00 PM',
    amount: 2000,
    status: 'completed',
  },
];

export default function TurfOwnerHomeScreen() {
  const router = useRouter();
  const [turfs, setTurfs] = useState(MY_TURFS);

  const toggleTurfStatus = (turfId: string) => {
    setTurfs(prevTurfs =>
      prevTurfs.map(turf =>
        turf.id === turfId ? { ...turf, isActive: !turf.isActive } : turf
      )
    );
  };

  const handleEditTurf = (turfId: string) => {
    // Navigate to edit turf screen with turf ID
    Alert.alert('Edit Turf', `Editing turf ${turfId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#4CAF50';
      case 'pending':
        return '#FF9800';
      case 'completed':
        return '#2196F3';
      default:
        return '#999';
    }
  };

  const activeTurfsCount = turfs.filter(t => t.isActive).length;
  const totalTodayBookings = turfs.reduce((sum, t) => sum + t.todayBookings, 0);
  const totalRevenue = turfs.reduce((sum, t) => sum + t.totalRevenue, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome Back!</Text>
          <Text style={styles.ownerName}>Turf Owner</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color="#fff" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/turf-owner/add-turf')}
              activeOpacity={0.7}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#4CAF5020' }]}>
                <MaterialIcons name="add-business" size={32} color="#4CAF50" />
              </View>
              <Text style={styles.quickActionTitle}>Add Turf</Text>
              <Text style={styles.quickActionSubtitle}>Register new turf</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/turf-owner/(dashboard)/events')}
              activeOpacity={0.7}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#FF980020' }]}>
                <MaterialIcons name="event" size={32} color="#FF9800" />
              </View>
              <Text style={styles.quickActionTitle}>Create Event</Text>
              <Text style={styles.quickActionSubtitle}>Organize tournament</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#4CAF5020' }]}>
              <MaterialIcons name="payments" size={28} color="#4CAF50" />
            </View>
            <Text style={styles.statValue}>₹{totalRevenue.toLocaleString()}</Text>
            <Text style={styles.statTitle}>Total Revenue</Text>
            <Text style={styles.statChange}>All turfs combined</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#2196F320' }]}>
              <MaterialIcons name="event-available" size={28} color="#2196F3" />
            </View>
            <Text style={styles.statValue}>{totalTodayBookings}</Text>
            <Text style={styles.statTitle}>Bookings Today</Text>
            <Text style={styles.statChange}>Across all turfs</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#FF980020' }]}>
              <MaterialIcons name="sports-cricket" size={28} color="#FF9800" />
            </View>
            <Text style={styles.statValue}>{activeTurfsCount}/{turfs.length}</Text>
            <Text style={styles.statTitle}>Active Turfs</Text>
            <Text style={styles.statChange}>Currently operational</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#9C27B020' }]}>
              <MaterialIcons name="people" size={28} color="#9C27B0" />
            </View>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statTitle}>Total Players</Text>
            <Text style={styles.statChange}>+23 this week</Text>
          </View>
        </View>

        {/* My Turfs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <MaterialIcons name="sports-soccer" size={24} color="#4CAF50" />
              <Text style={styles.sectionTitle}>My Turfs</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/turf-owner/add-turf')}>
              <View style={styles.addButton}>
                <Ionicons name="add-circle" size={20} color="#4CAF50" />
                <Text style={styles.addButtonText}>Add New</Text>
              </View>
            </TouchableOpacity>
          </View>

          {turfs.map((turf) => (
            <View key={turf.id} style={styles.turfCard}>
              {/* Status Banner */}
              <View style={[styles.statusBanner, { backgroundColor: turf.isActive ? '#4CAF50' : '#9E9E9E' }]}>
                <View style={styles.statusBannerContent}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusBannerText}>
                    {turf.isActive ? 'ACTIVE & ACCEPTING BOOKINGS' : 'CURRENTLY INACTIVE'}
                  </Text>
                </View>
                <Switch
                  value={turf.isActive}
                  onValueChange={() => toggleTurfStatus(turf.id)}
                  trackColor={{ false: '#757575', true: '#81C784' }}
                  thumbColor="#fff"
                  ios_backgroundColor="#757575"
                />
              </View>

              {/* Turf Header */}
              <View style={styles.turfHeader}>
                <View style={styles.turfIconContainer}>
                  <MaterialIcons
                    name={turf.type === 'Cricket' ? 'sports-cricket' : turf.type === 'Football' ? 'sports-soccer' : 'sports-tennis'}
                    size={28}
                    color="#4CAF50"
                  />
                </View>
                <View style={styles.turfMainInfo}>
                  <Text style={styles.turfName}>{turf.name}</Text>
                  <View style={styles.turfMeta}>
                    <Ionicons name="location-sharp" size={16} color="#FF9800" />
                    <Text style={styles.turfLocation}>{turf.location}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditTurf(turf.id)}
                >
                  <MaterialIcons name="edit" size={20} color="#2196F3" />
                </TouchableOpacity>
              </View>

              {/* Turf Type & Price */}
              <View style={styles.turfTagsRow}>
                <View style={styles.turfTypeTagNew}>
                  <MaterialIcons name="category" size={14} color="#2196F3" />
                  <Text style={styles.turfTypeTextNew}>{turf.type}</Text>
                </View>
                <View style={styles.turfPriceTag}>
                  <MaterialIcons name="currency-rupee" size={14} color="#4CAF50" />
                  <Text style={styles.turfPriceNew}>{turf.price}/hr</Text>
                </View>
              </View>

              {/* Stats Grid */}
              <View style={styles.turfStatsGrid}>
                <View style={styles.turfStatBox}>
                  <View style={[styles.statIconBox, { backgroundColor: '#2196F320' }]}>
                    <MaterialIcons name="event-available" size={20} color="#2196F3" />
                  </View>
                  <Text style={styles.turfStatValue}>{turf.todayBookings}</Text>
                  <Text style={styles.turfStatLabel}>Today's Bookings</Text>
                </View>

                <View style={styles.turfStatDivider} />

                <View style={styles.turfStatBox}>
                  <View style={[styles.statIconBox, { backgroundColor: '#4CAF5020' }]}>
                    <MaterialIcons name="account-balance-wallet" size={20} color="#4CAF50" />
                  </View>
                  <Text style={styles.turfStatValue}>₹{(turf.totalRevenue / 1000).toFixed(1)}k</Text>
                  <Text style={styles.turfStatLabel}>Total Revenue</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.turfActionButtons}>
                <TouchableOpacity style={styles.actionBtn}>
                  <MaterialIcons name="visibility" size={18} color="#2196F3" />
                  <Text style={styles.actionBtnText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.actionBtnPrimary]}
                  onPress={() => router.push({
                    pathname: '/turf-owner/manage-slots',
                    params: { turfId: turf.id, turfName: turf.name }
                  })}
                >
                  <MaterialIcons name="calendar-today" size={18} color="#fff" />
                  <Text style={[styles.actionBtnText, { color: '#fff' }]}>Manage Slots</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity onPress={() => router.push('/turf-owner/(dashboard)/bookings')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {RECENT_BOOKINGS.map((booking) => (
            <TouchableOpacity key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTurfName}>{booking.turfName}</Text>
                <Text style={styles.bookingCustomer}>{booking.customerName}</Text>
                <View style={styles.bookingDetails}>
                  <View style={styles.bookingDetailItem}>
                    <Ionicons name="calendar" size={14} color="#666" />
                    <Text style={styles.bookingDetailText}>{booking.date}</Text>
                  </View>
                  <View style={styles.bookingDetailItem}>
                    <Ionicons name="time" size={14} color="#666" />
                    <Text style={styles.bookingDetailText}>{booking.time}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.bookingRight}>
                <Text style={styles.bookingAmount}>₹{booking.amount}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: `${getStatusColor(booking.status)}20` },
                  ]}
                >
                  <Text
                    style={[styles.bookingStatusText, { color: getStatusColor(booking.status) }]}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  ownerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  quickActionIcon: {
    width: 65,
    height: 65,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    gap: 15,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 11,
    color: '#999',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  turfCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  statusBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  statusBannerText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  turfHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
    gap: 12,
  },
  turfIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#4CAF5015',
    alignItems: 'center',
    justifyContent: 'center',
  },
  turfMainInfo: {
    flex: 1,
  },
  turfName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  turfMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  turfLocation: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  turfTagsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  turfTypeTagNew: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  turfTypeTextNew: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
  },
  turfPriceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  turfPriceNew: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  turfStatsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  turfStatBox: {
    flex: 1,
    alignItems: 'center',
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  turfStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  turfStatLabel: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
  },
  turfStatDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  turfActionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  actionBtnPrimary: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTurfName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  bookingCustomer: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  bookingDetails: {
    flexDirection: 'row',
    gap: 15,
  },
  bookingDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookingDetailText: {
    fontSize: 12,
    color: '#666',
  },
  bookingRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  bookingAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  bookingStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
