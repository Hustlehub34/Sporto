import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Event {
  id: string;
  title: string;
  turfName: string;
  date: string;
  time: string;
  sport: string;
  playersNeeded: number;
  playersJoined: number;
  totalPlayers: number;
  pricePerPlayer: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  image: string;
}

const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Weekend Cricket Match',
    turfName: 'Green Valley Cricket Turf',
    date: '2025-10-26',
    time: '6:00 PM - 8:00 PM',
    sport: 'Cricket',
    playersNeeded: 3,
    playersJoined: 8,
    totalPlayers: 11,
    pricePerPlayer: 300,
    status: 'upcoming',
    image: 'https://via.placeholder.com/300x150/4CAF50/ffffff?text=Cricket',
  },
  {
    id: '2',
    title: 'Morning Practice Session',
    turfName: 'Champions Cricket Ground',
    date: '2025-10-25',
    time: '7:00 AM - 9:00 AM',
    sport: 'Cricket',
    playersNeeded: 0,
    playersJoined: 11,
    totalPlayers: 11,
    pricePerPlayer: 400,
    status: 'ongoing',
    image: 'https://via.placeholder.com/300x150/2196F3/ffffff?text=Practice',
  },
  {
    id: '3',
    title: 'Corporate Cricket Tournament',
    turfName: 'Sports Arena',
    date: '2025-10-27',
    time: '5:00 PM - 7:00 PM',
    sport: 'Cricket',
    playersNeeded: 5,
    playersJoined: 6,
    totalPlayers: 11,
    pricePerPlayer: 250,
    status: 'upcoming',
    image: 'https://via.placeholder.com/300x150/FF9800/ffffff?text=Tournament',
  },
  {
    id: '4',
    title: 'Evening Match',
    turfName: 'Pro Cricket Club',
    date: '2025-10-23',
    time: '6:00 PM - 8:00 PM',
    sport: 'Cricket',
    playersNeeded: 0,
    playersJoined: 11,
    totalPlayers: 11,
    pricePerPlayer: 500,
    status: 'completed',
    image: 'https://via.placeholder.com/300x150/9C27B0/ffffff?text=Match',
  },
];

export default function EventsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#2196F3';
      case 'ongoing':
        return '#4CAF50';
      case 'completed':
        return '#666';
      case 'cancelled':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const handleCreateEvent = () => {
    router.push('/turf-owner/add-event');
  };

  const handleEditEvent = (eventId: string) => {
    Alert.alert('Edit Event', `Edit event ${eventId}`);
  };

  const handleCancelEvent = (eventId: string) => {
    Alert.alert('Cancel Event', 'Are you sure you want to cancel this event?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: () => Alert.alert('Cancelled', 'Event has been cancelled'),
      },
    ]);
  };

  const handleViewPlayers = (event: Event) => {
    Alert.alert(
      'Players Joined',
      `${event.playersJoined} players have joined this event`
    );
  };

  const filteredEvents = EVENTS.filter((event) => {
    if (selectedFilter === 'all') return true;
    return event.status === selectedFilter;
  });

  const getFilterCount = (status: string) => {
    if (status === 'all') return EVENTS.length;
    return EVENTS.filter((e) => e.status === status).length;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events Management</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{EVENTS.filter((e) => e.status === 'upcoming').length}</Text>
          <Text style={styles.statLabel}>Upcoming</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{EVENTS.filter((e) => e.status === 'ongoing').length}</Text>
          <Text style={styles.statLabel}>Ongoing</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {EVENTS.reduce((sum, e) => sum + e.playersJoined, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Players</Text>
        </View>
      </View>

      {/* Filters */}
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
            selectedFilter === 'upcoming' && styles.filterChipActive,
          ]}
          onPress={() => setSelectedFilter('upcoming')}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'upcoming' && styles.filterChipTextActive,
            ]}
          >
            Upcoming ({getFilterCount('upcoming')})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterChip,
            selectedFilter === 'ongoing' && styles.filterChipActive,
          ]}
          onPress={() => setSelectedFilter('ongoing')}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedFilter === 'ongoing' && styles.filterChipTextActive,
            ]}
          >
            Ongoing ({getFilterCount('ongoing')})
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
      </ScrollView>

      {/* Events List */}
      <ScrollView style={styles.eventsList} showsVerticalScrollIndicator={false}>
        {filteredEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />

            {/* Status Badge */}
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(event.status) },
              ]}
            >
              <Text style={styles.statusText}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Text>
            </View>

            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventTurfName}>{event.turfName}</Text>

              <View style={styles.eventDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar" size={16} color="#666" />
                  <Text style={styles.detailText}>{event.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time" size={16} color="#666" />
                  <Text style={styles.detailText}>{event.time}</Text>
                </View>
              </View>

              {/* Players Progress */}
              <View style={styles.playersSection}>
                <View style={styles.playersHeader}>
                  <Text style={styles.playersLabel}>Players</Text>
                  <Text style={styles.playersCount}>
                    {event.playersJoined}/{event.totalPlayers}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(event.playersJoined / event.totalPlayers) * 100}%`,
                        backgroundColor:
                          event.playersNeeded === 0 ? '#4CAF50' : '#FF9800',
                      },
                    ]}
                  />
                </View>
                {event.playersNeeded > 0 && (
                  <Text style={styles.playersNeeded}>
                    {event.playersNeeded} more needed
                  </Text>
                )}
              </View>

              {/* Price */}
              <View style={styles.priceRow}>
                <Ionicons name="cash" size={18} color="#4CAF50" />
                <Text style={styles.priceText}>₹{event.pricePerPlayer}/player</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.playersButton}
                  onPress={() => handleViewPlayers(event)}
                >
                  <Ionicons name="people" size={18} color="#2196F3" />
                  <Text style={styles.playersButtonText}>View Players</Text>
                </TouchableOpacity>

                {event.status === 'upcoming' && (
                  <>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditEvent(event.id)}
                    >
                      <MaterialIcons name="edit" size={18} color="#FF9800" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => handleCancelEvent(event.id)}
                    >
                      <MaterialIcons name="cancel" size={18} color="#F44336" />
                    </TouchableOpacity>
                  </>
                )}

                {event.status === 'completed' && (
                  <TouchableOpacity style={styles.reportButton}>
                    <MaterialIcons name="assessment" size={18} color="#fff" />
                    <Text style={styles.reportButtonText}>View Report</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
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
  createButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 15,
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
  eventsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
  },
  statusBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  eventContent: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventTurfName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  eventDetails: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
  },
  playersSection: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  playersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  playersLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  playersCount: {
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  playersNeeded: {
    fontSize: 12,
    color: '#FF9800',
    marginTop: 6,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 15,
  },
  priceText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  playersButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  playersButtonText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  reportButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
});
