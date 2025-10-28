import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
  description: string;
  date: string;
  time: string;
  location: string;
  turf: string;
  sport: string;
  participants: number;
  maxParticipants: number;
  entryFee: string;
  image: string;
  type: 'upcoming' | 'best' | 'top';
  organizer: string;
}

const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Weekend Football Tournament',
    description: '5v5 football tournament for all skill levels',
    date: '2 Nov 2025',
    time: '10:00 AM',
    location: 'Koramangala, Bangalore',
    turf: 'Green Field Sports Complex',
    sport: 'Football',
    participants: 45,
    maxParticipants: 50,
    entryFee: '₹500',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    type: 'upcoming',
    organizer: 'Sporto Events',
  },
  {
    id: '2',
    title: 'Cricket Premier League',
    description: 'Inter-city cricket championship',
    date: '5 Nov 2025',
    time: '8:00 AM',
    location: 'HSR Layout, Bangalore',
    turf: 'Champions Arena',
    sport: 'Cricket',
    participants: 80,
    maxParticipants: 100,
    entryFee: '₹800',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    type: 'best',
    organizer: 'Sports Hub',
  },
  {
    id: '3',
    title: 'Basketball 3x3 Championship',
    description: 'Fast-paced 3x3 basketball tournament',
    date: '8 Nov 2025',
    time: '4:00 PM',
    location: 'Whitefield, Bangalore',
    turf: 'Sports Hub Premium',
    sport: 'Basketball',
    participants: 30,
    maxParticipants: 32,
    entryFee: '₹600',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    type: 'top',
    organizer: 'Hoops Nation',
  },
  {
    id: '4',
    title: 'Badminton Doubles Showdown',
    description: 'Competitive doubles badminton tournament',
    date: '10 Nov 2025',
    time: '6:00 PM',
    location: 'Indiranagar, Bangalore',
    turf: 'Victory Grounds',
    sport: 'Badminton',
    participants: 24,
    maxParticipants: 32,
    entryFee: '₹400',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
    type: 'upcoming',
    organizer: 'Shuttle Masters',
  },
  {
    id: '5',
    title: 'Sunday Football Fiesta',
    description: 'Friendly football matches and skills competition',
    date: '12 Nov 2025',
    time: '9:00 AM',
    location: 'Koramangala, Bangalore',
    turf: 'Green Field Sports Complex',
    sport: 'Football',
    participants: 60,
    maxParticipants: 60,
    entryFee: 'Free',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
    type: 'best',
    organizer: 'Community Sports',
  },
  {
    id: '6',
    title: 'Night Cricket Carnival',
    description: 'T20 cricket under the lights',
    date: '15 Nov 2025',
    time: '7:00 PM',
    location: 'Whitefield, Bangalore',
    turf: 'Sports Hub Premium',
    sport: 'Cricket',
    participants: 50,
    maxParticipants: 64,
    entryFee: '₹700',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
    type: 'top',
    organizer: 'Cricket Club',
  },
];

export default function EventsScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'best' | 'top'>('all');

  const filteredEvents = selectedFilter === 'all'
    ? EVENTS
    : EVENTS.filter(event => event.type === selectedFilter);

  const handleEventClick = (event: Event) => {
    router.push(`/event-detail?id=${event.id}`);
  };

  const handleBookEvent = (event: Event) => {
    const isFullyBooked = event.participants >= event.maxParticipants;

    if (isFullyBooked) {
      Alert.alert('Event Full', 'This event is fully booked. Please check other events.');
      return;
    }

    if (event.entryFee === 'Free') {
      Alert.alert(
        'Confirm Booking 🎉',
        `Book your spot for ${event.title}?\n\nDate: ${event.date} at ${event.time}\nLocation: ${event.turf}`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm',
            onPress: () => {
              Alert.alert('Booked! 🎉', 'Your spot has been confirmed! See you there.');
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Proceed to Payment 💳',
        `Event: ${event.title}\nEntry Fee: ${event.entryFee}\n\nSelect payment method:`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'UPI/Card',
            onPress: () => {
              Alert.alert('Payment Successful! 🎉', `Your booking for ${event.title} is confirmed!\n\nPayment: ${event.entryFee}\nTransaction ID: TXN${Math.floor(Math.random() * 1000000)}`);
            },
          },
          {
            text: 'Wallet',
            onPress: () => {
              Alert.alert('Payment Successful! 🎉', `Your booking for ${event.title} is confirmed!\n\nPaid via Wallet: ${event.entryFee}\nTransaction ID: TXN${Math.floor(Math.random() * 1000000)}`);
            },
          },
        ]
      );
    }
  };

  const renderEventCard = (event: Event) => {
    const isFullyBooked = event.participants >= event.maxParticipants;
    const spotsLeft = event.maxParticipants - event.participants;
    const isFree = event.entryFee === 'Free';

    return (
      <TouchableOpacity
        key={event.id}
        style={styles.eventCard3D}
        activeOpacity={0.9}
        onPress={() => handleEventClick(event)}
      >
        <View style={styles.eventCardInner}>
          {/* Event Image with Gradient Overlay */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: event.image }} style={styles.eventImage} />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.85)']}
              style={styles.imageGradient}
            />

            {/* Floating Type Badge */}
            <View style={styles.typeBadge3D}>
              <LinearGradient
                colors={
                  event.type === 'upcoming'
                    ? ['#4CAF50', '#45a049']
                    : event.type === 'best'
                    ? ['#FF9800', '#F57C00']
                    : ['#2196F3', '#1976D2']
                }
                style={styles.typeBadgeGradient}
              >
                <Ionicons
                  name={
                    event.type === 'upcoming'
                      ? 'calendar'
                      : event.type === 'best'
                      ? 'star'
                      : 'trending-up'
                  }
                  size={14}
                  color="#fff"
                />
                <Text style={styles.typeBadgeText}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Text>
              </LinearGradient>
            </View>

            {/* Fully Booked Badge */}
            {isFullyBooked && (
              <View style={styles.fullyBookedBadge3D}>
                <LinearGradient
                  colors={['#F44336', '#D32F2F']}
                  style={styles.fullyBookedGradient}
                >
                  <Ionicons name="close-circle" size={16} color="#fff" />
                  <Text style={styles.fullyBookedText}>FULL</Text>
                </LinearGradient>
              </View>
            )}

            {/* Event Title on Image */}
            <View style={styles.imageTitleContainer}>
              <Text style={styles.imageTitle} numberOfLines={2}>{event.title}</Text>
              <Text style={styles.imageOrganizer}>by {event.organizer}</Text>
            </View>
          </View>

          {/* Event Details Section */}
          <View style={styles.eventContent}>
            <Text style={styles.eventDescription} numberOfLines={2}>
              {event.description}
            </Text>

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailCard}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.detailCardGradient}
                >
                  <Ionicons name="calendar-outline" size={20} color="#fff" />
                  <Text style={styles.detailCardLabel}>Date</Text>
                  <Text style={styles.detailCardValue}>{event.date}</Text>
                </LinearGradient>
              </View>

              <View style={styles.detailCard}>
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  style={styles.detailCardGradient}
                >
                  <Ionicons name="time-outline" size={20} color="#fff" />
                  <Text style={styles.detailCardLabel}>Time</Text>
                  <Text style={styles.detailCardValue}>{event.time}</Text>
                </LinearGradient>
              </View>
            </View>

            <View style={styles.locationRow}>
              <View style={styles.locationIcon}>
                <Ionicons name="location" size={18} color="#667eea" />
              </View>
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationTurf}>{event.turf}</Text>
                <Text style={styles.locationArea}>{event.location}</Text>
              </View>
            </View>

            {/* Sport & Participants */}
            <View style={styles.infoChips}>
              <View style={styles.sportChip}>
                <Ionicons name="basketball" size={14} color="#FF9800" />
                <Text style={styles.sportChipText}>{event.sport}</Text>
              </View>
              <View style={styles.participantsChip}>
                <Ionicons name="people" size={14} color="#4CAF50" />
                <Text style={styles.participantsChipText}>
                  {event.participants}/{event.maxParticipants} joined
                </Text>
              </View>
              {!isFullyBooked && spotsLeft <= 10 && (
                <View style={styles.urgencyChip}>
                  <Ionicons name="flash" size={12} color="#fff" />
                  <Text style={styles.urgencyChipText}>{spotsLeft} left!</Text>
                </View>
              )}
            </View>

            {/* Price & Book Section */}
            <View style={styles.bookingSection}>
              <View style={styles.priceContainer3D}>
                <LinearGradient
                  colors={isFree ? ['#4CAF50', '#45a049'] : ['#667eea', '#764ba2']}
                  style={styles.priceGradient}
                >
                  <Text style={styles.priceLabel}>Entry Fee</Text>
                  <Text style={styles.priceValue}>{event.entryFee}</Text>
                  {!isFree && (
                    <View style={styles.priceBadge}>
                      <Ionicons name="card" size={12} color="#fff" />
                    </View>
                  )}
                </LinearGradient>
              </View>

              <TouchableOpacity
                style={[
                  styles.bookButton3D,
                  isFullyBooked && styles.bookButtonDisabled,
                ]}
                onPress={(e) => {
                  e.stopPropagation();
                  handleEventClick(event);
                }}
                disabled={isFullyBooked}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    isFullyBooked
                      ? ['#999', '#777']
                      : ['#4CAF50', '#45a049']
                  }
                  style={styles.bookButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons
                    name={isFullyBooked ? 'lock-closed' : 'checkmark-circle'}
                    size={20}
                    color="#fff"
                  />
                  <Text style={styles.bookButtonText}>
                    {isFullyBooked ? 'Event Full' : 'Book Now'}
                  </Text>
                  {!isFullyBooked && (
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
            <Text style={styles.headerTitle}>Events 🎉</Text>
            <Text style={styles.headerSubtitle}>Book your spot & pay online</Text>
          </View>
          <TouchableOpacity style={styles.filterIconButton}>
            <Ionicons name="options" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
        >
          <TouchableOpacity
            style={[
              styles.filterChip3D,
              selectedFilter === 'all' && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter('all')}
            activeOpacity={0.8}
          >
            {selectedFilter === 'all' ? (
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.filterChipGradient}
              >
                <Ionicons name="grid" size={16} color="#fff" />
                <Text style={styles.filterChipTextActive}>All Events</Text>
              </LinearGradient>
            ) : (
              <View style={styles.filterChipPlain}>
                <Ionicons name="grid" size={16} color="rgba(255,255,255,0.7)" />
                <Text style={styles.filterChipText}>All Events</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip3D,
              selectedFilter === 'upcoming' && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter('upcoming')}
            activeOpacity={0.8}
          >
            {selectedFilter === 'upcoming' ? (
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.filterChipGradient}
              >
                <Ionicons name="calendar" size={16} color="#fff" />
                <Text style={styles.filterChipTextActive}>Upcoming</Text>
              </LinearGradient>
            ) : (
              <View style={styles.filterChipPlain}>
                <Ionicons name="calendar" size={16} color="rgba(255,255,255,0.7)" />
                <Text style={styles.filterChipText}>Upcoming</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip3D,
              selectedFilter === 'best' && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter('best')}
            activeOpacity={0.8}
          >
            {selectedFilter === 'best' ? (
              <LinearGradient
                colors={['#FF9800', '#F57C00']}
                style={styles.filterChipGradient}
              >
                <Ionicons name="star" size={16} color="#fff" />
                <Text style={styles.filterChipTextActive}>Best Events</Text>
              </LinearGradient>
            ) : (
              <View style={styles.filterChipPlain}>
                <Ionicons name="star" size={16} color="rgba(255,255,255,0.7)" />
                <Text style={styles.filterChipText}>Best Events</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip3D,
              selectedFilter === 'top' && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter('top')}
            activeOpacity={0.8}
          >
            {selectedFilter === 'top' ? (
              <LinearGradient
                colors={['#2196F3', '#1976D2']}
                style={styles.filterChipGradient}
              >
                <Ionicons name="trending-up" size={16} color="#fff" />
                <Text style={styles.filterChipTextActive}>Top Events</Text>
              </LinearGradient>
            ) : (
              <View style={styles.filterChipPlain}>
                <Ionicons name="trending-up" size={16} color="rgba(255,255,255,0.7)" />
                <Text style={styles.filterChipText}>Top Events</Text>
              </View>
            )}
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>

      {/* Events List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.eventsList}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(renderEventCard)
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={80} color="#ccc" />
              <Text style={styles.emptyText}>No Events Available</Text>
              <Text style={styles.emptySubtext}>Check back later for new events</Text>
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
  filterIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterScrollView: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  filterChip3D: {
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  filterChipActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  filterChipGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 6,
  },
  filterChipPlain: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    gap: 6,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  filterChipTextActive: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  eventsList: {
    padding: 20,
  },
  // 3D Event Card
  eventCard3D: {
    marginBottom: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
    transform: [{ perspective: 1000 }],
  },
  eventCardInner: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    height: 220,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
  },
  typeBadge3D: {
    position: 'absolute',
    top: 15,
    left: 15,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  typeBadgeGradient: {
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
  fullyBookedBadge3D: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#F44336',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  fullyBookedGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
  },
  fullyBookedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  imageTitleContainer: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
  },
  imageTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  imageOrganizer: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  eventContent: {
    padding: 16,
  },
  eventDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  detailCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  detailCardGradient: {
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  detailCardLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
  detailCardValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5F5FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 10,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationTextContainer: {
    flex: 1,
  },
  locationTurf: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  locationArea: {
    fontSize: 12,
    color: '#666',
  },
  infoChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  sportChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  sportChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF9800',
  },
  participantsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  participantsChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  urgencyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  urgencyChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  bookingSection: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  priceContainer3D: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  priceGradient: {
    padding: 15,
    alignItems: 'center',
    position: 'relative',
  },
  priceLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
  },
  priceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  bookButton3D: {
    flex: 1.5,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  bookButtonDisabled: {
    shadowColor: '#999',
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 8,
  },
  bookButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});