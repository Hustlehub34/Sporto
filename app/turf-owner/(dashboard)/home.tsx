import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  change: string;
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

const STATS: StatCard[] = [
  {
    title: 'Total Revenue',
    value: '₹45,280',
    icon: 'payments',
    color: '#4CAF50',
    change: '+12% from last month',
  },
  {
    title: 'Bookings Today',
    value: '8',
    icon: 'event-available',
    color: '#2196F3',
    change: '3 upcoming',
  },
  {
    title: 'Active Turfs',
    value: '4',
    icon: 'sports-cricket',
    color: '#FF9800',
    change: 'All operational',
  },
  {
    title: 'Players Joined',
    value: '156',
    icon: 'people',
    color: '#9C27B0',
    change: '+23 this week',
  },
];

const RECENT_BOOKINGS: RecentBooking[] = [
  {
    id: '1',
    turfName: 'Green Valley Cricket Turf',
    customerName: 'Rahul Sharma',
    date: '2025-10-24',
    time: '6:00 PM - 8:00 PM',
    amount: 2400,
    status: 'confirmed',
  },
  {
    id: '2',
    turfName: 'Champions Cricket Ground',
    customerName: 'Priya Patel',
    date: '2025-10-25',
    time: '7:00 AM - 9:00 AM',
    amount: 3200,
    status: 'pending',
  },
  {
    id: '3',
    turfName: 'Sports Arena',
    customerName: 'Amit Kumar',
    date: '2025-10-24',
    time: '4:00 PM - 6:00 PM',
    amount: 2000,
    status: 'completed',
  },
];

export default function TurfOwnerHomeScreen() {
  const router = useRouter();

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
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {STATS.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View
                style={[styles.statIconContainer, { backgroundColor: `${stat.color}20` }]}
              >
                <MaterialIcons name={stat.icon as any} size={28} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <Text style={styles.statChange}>{stat.change}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/turf-owner/add-turf')}
            >
              <View style={styles.actionIconContainer}>
                <MaterialIcons name="add-business" size={28} color="#4CAF50" />
              </View>
              <Text style={styles.actionText}>Add Turf</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push('/turf-owner/add-event')}
            >
              <View style={styles.actionIconContainer}>
                <MaterialIcons name="event" size={28} color="#2196F3" />
              </View>
              <Text style={styles.actionText}>Create Event</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIconContainer}>
                <MaterialIcons name="analytics" size={28} color="#FF9800" />
              </View>
              <Text style={styles.actionText}>View Reports</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIconContainer}>
                <MaterialIcons name="settings" size={28} color="#9C27B0" />
              </View>
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity>
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
                    style={[styles.statusText, { color: getStatusColor(booking.status) }]}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Revenue Chart Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Overview</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartPlaceholder}>
              <MaterialIcons name="show-chart" size={80} color="#e0e0e0" />
              <Text style={styles.chartPlaceholderText}>
                Revenue chart will be displayed here
              </Text>
            </View>
            <View style={styles.chartStats}>
              <View style={styles.chartStatItem}>
                <Text style={styles.chartStatLabel}>This Month</Text>
                <Text style={styles.chartStatValue}>₹45,280</Text>
              </View>
              <View style={styles.chartStatDivider} />
              <View style={styles.chartStatItem}>
                <Text style={styles.chartStatLabel}>Last Month</Text>
                <Text style={styles.chartStatValue}>₹40,450</Text>
              </View>
              <View style={styles.chartStatDivider} />
              <View style={styles.chartStatItem}>
                <Text style={styles.chartStatLabel}>Growth</Text>
                <Text style={[styles.chartStatValue, { color: '#4CAF50' }]}>+12%</Text>
              </View>
            </View>
          </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
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
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#999',
    marginTop: 15,
  },
  chartStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  chartStatItem: {
    alignItems: 'center',
  },
  chartStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  chartStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chartStatDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
});
