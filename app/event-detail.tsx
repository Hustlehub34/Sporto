import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// All events data
const ALL_EVENTS = [
  {
    id: '1',
    title: 'Weekend Football Tournament',
    subtitle: 'Premier 5v5 Championship 2025',
    description: 'Experience the thrill of competitive football at its finest! Join us for an action-packed day featuring the best amateur teams in Bangalore.',
    longDescription: 'Our tournament is designed for football enthusiasts who want to experience competitive sports at the highest amateur level. We provide a complete professional setup with qualified referees, medical staff on-site, and premium facilities.',
    date: '2 Nov 2025',
    time: '10:00 AM',
    endTime: '6:00 PM',
    duration: '8 hours',
    location: 'Koramangala, Bangalore',
    turf: 'Green Field Sports Complex',
    sport: 'Football',
    format: '5v5',
    participants: 45,
    maxParticipants: 50,
    entryFee: '500',
    prizePool: '₹10,000',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    type: 'upcoming' as const,
  },
  {
    id: '2',
    title: 'Cricket Premier League',
    subtitle: 'Inter-City Championship Series',
    description: 'Join the most exciting cricket tournament of the season! Inter-city cricket championship featuring top amateur teams from across Bangalore.',
    longDescription: 'This premier cricket league brings together the finest cricket talent in the city. Experience professional-level competition with experienced umpires, quality equipment, and excellent facilities. Perfect for serious cricketers looking to showcase their skills.',
    date: '5 Nov 2025',
    time: '8:00 AM',
    endTime: '7:00 PM',
    duration: '11 hours',
    location: 'HSR Layout, Bangalore',
    turf: 'Champions Arena',
    sport: 'Cricket',
    format: '11v11',
    participants: 80,
    maxParticipants: 100,
    entryFee: '800',
    prizePool: '₹20,000',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    type: 'best' as const,
  },
  {
    id: '3',
    title: 'Basketball 3x3 Championship',
    subtitle: 'Street Basketball Tournament',
    description: 'Fast-paced 3x3 basketball tournament for all skill levels. Show off your street basketball skills in this exciting urban tournament!',
    longDescription: 'Experience the intensity of 3x3 basketball with quick matches, high-energy gameplay, and competitive teams. This urban basketball format is perfect for showcasing individual skills while maintaining team dynamics.',
    date: '8 Nov 2025',
    time: '4:00 PM',
    endTime: '9:00 PM',
    duration: '5 hours',
    location: 'Whitefield, Bangalore',
    turf: 'Sports Hub Premium',
    sport: 'Basketball',
    format: '3v3',
    participants: 30,
    maxParticipants: 32,
    entryFee: '600',
    prizePool: '₹12,000',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    type: 'top' as const,
  },
  {
    id: '4',
    title: 'Badminton Doubles Showdown',
    subtitle: 'Elite Doubles Competition',
    description: 'Competitive doubles badminton tournament featuring skilled players from across the city. Team up and compete for glory!',
    longDescription: 'This doubles tournament is perfect for badminton enthusiasts who love team play. With professional-grade courts, experienced referees, and competitive matches, this event promises high-quality badminton action.',
    date: '10 Nov 2025',
    time: '6:00 PM',
    endTime: '10:00 PM',
    duration: '4 hours',
    location: 'Indiranagar, Bangalore',
    turf: 'Victory Grounds',
    sport: 'Badminton',
    format: 'Doubles',
    participants: 24,
    maxParticipants: 32,
    entryFee: '400',
    prizePool: '₹8,000',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
    type: 'upcoming' as const,
  },
  {
    id: '5',
    title: 'Sunday Football Fiesta',
    subtitle: 'Community Football Carnival',
    description: 'Friendly football matches and skills competition! Perfect for casual players and families. Everyone is welcome to join the fun!',
    longDescription: 'A community-focused football event designed for players of all ages and skill levels. This is more about participation, fun, and community building than competition. Bring your family and friends for a day of football fun!',
    date: '12 Nov 2025',
    time: '9:00 AM',
    endTime: '5:00 PM',
    duration: '8 hours',
    location: 'Koramangala, Bangalore',
    turf: 'Green Field Sports Complex',
    sport: 'Football',
    format: '5v5',
    participants: 60,
    maxParticipants: 60,
    entryFee: 'Free',
    prizePool: 'Certificates',
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
    type: 'best' as const,
  },
  {
    id: '6',
    title: 'Night Cricket Carnival',
    subtitle: 'T20 Under The Lights',
    description: 'T20 cricket under the lights! Experience the thrill of night cricket with floodlit grounds and exciting T20 format matches.',
    longDescription: 'Night cricket brings a unique atmosphere to the game. Under professional floodlights, teams compete in fast-paced T20 matches. The evening setting adds excitement and makes for great viewing for spectators.',
    date: '15 Nov 2025',
    time: '7:00 PM',
    endTime: '11:00 PM',
    duration: '4 hours',
    location: 'Whitefield, Bangalore',
    turf: 'Sports Hub Premium',
    sport: 'Cricket',
    format: 'T20',
    participants: 50,
    maxParticipants: 64,
    entryFee: '700',
    prizePool: '₹15,000',
    difficulty: 'Advanced',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
    type: 'top' as const,
  },
];

export default function EventDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'schedule' | 'rules'>('about');

  // Get event ID from URL parameters
  const eventId = params.id as string;

  // Find the event by ID
  const baseEvent = useMemo(() => {
    return ALL_EVENTS.find(e => e.id === eventId) || ALL_EVENTS[0];
  }, [eventId]);

  // Enhanced event data with all details
  const event = {
    ...baseEvent,
    organizer: {
      name: 'Sporto Events',
      rating: 4.8,
      eventsHosted: 124,
      verified: true,
    },
    eventRanking: {
      overall: 4.7,
      organization: 4.9,
      facilities: 4.6,
      value: 4.5,
      reviews: 156,
    },
    amenities: [
      { name: 'Changing Rooms', icon: 'shirt-outline', available: true },
      { name: 'Lockers', icon: 'lock-closed-outline', available: true },
      { name: 'Hot Showers', icon: 'water-outline', available: true },
      { name: 'First Aid', icon: 'medical-outline', available: true },
      { name: 'Refreshments', icon: 'restaurant-outline', available: true },
      { name: 'Parking', icon: 'car-outline', available: true },
      { name: 'Live Scoring', icon: 'stats-chart-outline', available: true },
      { name: 'Photography', icon: 'camera-outline', available: true },
      { name: 'WiFi', icon: 'wifi-outline', available: false },
    ],
    dosList: [
      'Arrive 30 minutes before your match',
      'Bring valid ID proof for registration',
      'Wear proper football boots',
      'Stay hydrated throughout the event',
      'Respect referees decisions',
      'Follow fair play guidelines',
      'Bring your own water bottle',
    ],
    dontsList: [
      'No metal studs allowed',
      'No aggressive behavior or fighting',
      'No alcohol or smoking on premises',
      'Don\'t argue with match officials',
      'No outside food in playing area',
      'Don\'t enter field without permission',
      'No pets allowed',
    ],
    prizes: [
      { position: '1st Place', prize: '₹5,000', trophy: 'Trophy + Medals', color: ['#FFD700', '#FFA500'] as [string, string] },
      { position: '2nd Place', prize: '₹3,000', trophy: 'Trophy + Medals', color: ['#C0C0C0', '#808080'] as [string, string] },
      { position: '3rd Place', prize: '₹2,000', trophy: 'Medals', color: ['#CD7F32', '#8B4513'] as [string, string] },
    ],
    schedule: [
      { time: '10:00 AM', activity: 'Registration & Team Check-in', icon: 'clipboard-outline' },
      { time: '10:30 AM', activity: 'Tournament Briefing & Rules', icon: 'megaphone-outline' },
      { time: '11:00 AM', activity: 'Quarter Finals (4 matches)', icon: 'football-outline' },
      { time: '1:00 PM', activity: 'Lunch Break', icon: 'restaurant-outline' },
      { time: '2:00 PM', activity: 'Semi Finals (2 matches)', icon: 'trophy-outline' },
      { time: '4:00 PM', activity: 'Finals & 3rd Place Match', icon: 'ribbon-outline' },
      { time: '5:30 PM', activity: 'Prize Distribution Ceremony', icon: 'medal-outline' },
    ],
    rules: [
      'Each team must have 5 players + 2 substitutes',
      'Match duration: 20 minutes (10 min each half)',
      'Rolling substitutions allowed',
      'FIFA standard rules apply',
      'Age limit: 16-45 years',
      'All players must wear shin guards',
      'Team jersey must have numbers',
      'Referee decision is final',
    ],
  };

  const handleBookEvent = () => {
    const spotsLeft = event.maxParticipants - event.participants;
    const isFree = event.entryFee === 'Free';

    if (isFree) {
      // Free event - just confirm
      Alert.alert(
        'Confirm Booking 🎉',
        `Book your spot for ${event.title}?\n\nDate: ${event.date} at ${event.time}\nLocation: ${event.turf}\n\nThis is a FREE event!`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm',
            onPress: () => {
              Alert.alert(
                'Booked! 🎉',
                `Your spot for ${event.title} is confirmed!\n\nCheck your email for event details.`
              );
            },
          },
        ]
      );
    } else {
      // Paid event - show payment options
      Alert.alert(
        'Proceed to Payment 💳',
        `Event: ${event.title}\nEntry Fee: ₹${event.entryFee}\nSpots Left: ${spotsLeft}\n\nSelect payment method:`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'UPI/Card',
            onPress: () => {
              Alert.alert(
                'Payment Successful! 🎉',
                `Your booking for ${event.title} is confirmed!\n\nPayment: ₹${event.entryFee}\nTransaction ID: TXN${Math.floor(Math.random() * 1000000)}\n\nCheck your email for event details.`
              );
            },
          },
          {
            text: 'Wallet',
            onPress: () => {
              Alert.alert(
                'Payment Successful! 🎉',
                `Your booking for ${event.title} is confirmed!\n\nPaid via Wallet: ₹${event.entryFee}\nTransaction ID: TXN${Math.floor(Math.random() * 1000000)}\n\nCheck your email for event details.`
              );
            },
          },
        ]
      );
    }
  };

  const spotsLeft = event.maxParticipants - event.participants;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: event.image }} style={styles.heroImage} />

          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.85)']}
            style={styles.heroGradient}
          />

          {/* Header Buttons */}
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.headerButton3D}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)']}
                style={styles.headerButtonGradient}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.headerRightButtons}>
              <TouchableOpacity
                style={styles.headerButton3D}
                onPress={() => setIsFavorite(!isFavorite)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    isFavorite
                      ? ['#F44336', '#D32F2F']
                      : ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)']
                  }
                  style={styles.headerButtonGradient}
                >
                  <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={22}
                    color="#fff"
                  />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.headerButton3D}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)']}
                  style={styles.headerButtonGradient}
                >
                  <Ionicons name="share-social" size={22} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Event Title Overlay */}
          <View style={styles.heroTitleContainer}>
            <View style={styles.typeBadge}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.typeBadgeGradient}
              >
                <Ionicons name="trophy" size={14} color="#fff" />
                <Text style={styles.typeBadgeText}>Tournament</Text>
              </LinearGradient>
            </View>
            <Text style={styles.heroTitle}>{event.title}</Text>
            <Text style={styles.heroSubtitle}>{event.subtitle}</Text>

            {/* Quick Stats */}
            <View style={styles.quickStats}>
              <View style={styles.quickStatItem}>
                <Ionicons name="people" size={16} color="#fff" />
                <Text style={styles.quickStatText}>
                  {event.participants}/{event.maxParticipants}
                </Text>
              </View>
              <View style={styles.quickStatDivider} />
              <View style={styles.quickStatItem}>
                <Ionicons name="location" size={16} color="#fff" />
                <Text style={styles.quickStatText}>{event.location}</Text>
              </View>
              <View style={styles.quickStatDivider} />
              <View style={styles.quickStatItem}>
                <Ionicons name="calendar" size={16} color="#fff" />
                <Text style={styles.quickStatText}>{event.date}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Organizer & Rating Section */}
        <View style={styles.organizerSection}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.organizerGradient}
          >
            <View style={styles.organizerInfo}>
              <View style={styles.organizerLeft}>
                <View style={styles.organizerAvatar}>
                  <Ionicons name="business" size={24} color="#fff" />
                </View>
                <View>
                  <View style={styles.organizerNameRow}>
                    <Text style={styles.organizerName}>{event.organizer.name}</Text>
                    {event.organizer.verified && (
                      <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    )}
                  </View>
                  <View style={styles.organizerStats}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.organizerRating}>{event.organizer.rating}</Text>
                    <Text style={styles.organizerEvents}>• {event.organizer.eventsHosted} events</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="chatbubble" size={20} color="#667eea" />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Event Rating */}
          <View style={styles.ratingCard}>
            <View style={styles.ratingHeader}>
              <Text style={styles.ratingTitle}>Event Rating</Text>
              <Text style={styles.reviewCount}>{event.eventRanking.reviews} reviews</Text>
            </View>
            <View style={styles.ratingMainRow}>
              <View style={styles.ratingMainLeft}>
                <Text style={styles.ratingNumber}>{event.eventRanking.overall}</Text>
                <View style={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= Math.floor(event.eventRanking.overall) ? 'star' : 'star-outline'}
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
              <View style={styles.ratingBreakdown}>
                {Object.entries(event.eventRanking)
                  .filter(([key]) => key !== 'overall' && key !== 'reviews')
                  .map(([key, value]) => (
                    <View key={key} style={styles.ratingRow}>
                      <Text style={styles.ratingLabel}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Text>
                      <View style={styles.ratingBarContainer}>
                        <View style={[styles.ratingBar, { width: `${(value / 5) * 100}%` }]} />
                      </View>
                      <Text style={styles.ratingValue}>{value}</Text>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'about' && styles.tabActive]}
            onPress={() => setActiveTab('about')}
            activeOpacity={0.8}
          >
            {activeTab === 'about' ? (
              <LinearGradient colors={['#667eea', '#764ba2']} style={styles.tabGradient}>
                <Ionicons name="information-circle" size={18} color="#fff" />
                <Text style={styles.tabTextActive}>About</Text>
              </LinearGradient>
            ) : (
              <>
                <Ionicons name="information-circle-outline" size={18} color="#666" />
                <Text style={styles.tabText}>About</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'schedule' && styles.tabActive]}
            onPress={() => setActiveTab('schedule')}
            activeOpacity={0.8}
          >
            {activeTab === 'schedule' ? (
              <LinearGradient colors={['#FF9800', '#F57C00']} style={styles.tabGradient}>
                <Ionicons name="time" size={18} color="#fff" />
                <Text style={styles.tabTextActive}>Schedule</Text>
              </LinearGradient>
            ) : (
              <>
                <Ionicons name="time-outline" size={18} color="#666" />
                <Text style={styles.tabText}>Schedule</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'rules' && styles.tabActive]}
            onPress={() => setActiveTab('rules')}
            activeOpacity={0.8}
          >
            {activeTab === 'rules' ? (
              <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.tabGradient}>
                <Ionicons name="list" size={18} color="#fff" />
                <Text style={styles.tabTextActive}>Rules</Text>
              </LinearGradient>
            ) : (
              <>
                <Ionicons name="list-outline" size={18} color="#666" />
                <Text style={styles.tabText}>Rules</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <View style={styles.tabContent}>
            {/* Description */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="document-text" size={22} color="#667eea" />
                <Text style={styles.sectionTitle}>About Event</Text>
              </View>
              <Text style={styles.description}>{event.description}</Text>
              <Text style={styles.longDescription}>{event.longDescription}</Text>
            </View>

            {/* Amenities */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="star" size={22} color="#667eea" />
                <Text style={styles.sectionTitle}>Amenities</Text>
              </View>
              <View style={styles.amenitiesGrid}>
                {event.amenities.map((amenity, index) => (
                  <View
                    key={index}
                    style={[
                      styles.amenityCard,
                      !amenity.available && styles.amenityCardDisabled,
                    ]}
                  >
                    <View style={styles.amenityIcon}>
                      <LinearGradient
                        colors={
                          amenity.available
                            ? ['#667eea', '#764ba2']
                            : ['#ccc', '#999']
                        }
                        style={styles.amenityIconGradient}
                      >
                        <Ionicons name={amenity.icon as any} size={20} color="#fff" />
                      </LinearGradient>
                    </View>
                    <Text
                      style={[
                        styles.amenityName,
                        !amenity.available && styles.amenityNameDisabled,
                      ]}
                    >
                      {amenity.name}
                    </Text>
                    {!amenity.available && (
                      <View style={styles.unavailableBadge}>
                        <Text style={styles.unavailableText}>N/A</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Do's and Don'ts */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="shield-checkmark" size={22} color="#667eea" />
                <Text style={styles.sectionTitle}>Do's & Don'ts</Text>
              </View>

              {/* Do's */}
              <View style={styles.dosCard}>
                <View style={styles.dosHeader}>
                  <LinearGradient colors={['#4CAF50', '#45a049']} style={styles.dosIconContainer}>
                    <Ionicons name="checkmark-circle" size={24} color="#fff" />
                  </LinearGradient>
                  <Text style={styles.dosTitle}>Do's</Text>
                </View>
                {event.dosList.map((item, index) => (
                  <View key={index} style={styles.dosItem}>
                    <Ionicons name="checkmark" size={18} color="#4CAF50" />
                    <Text style={styles.dosText}>{item}</Text>
                  </View>
                ))}
              </View>

              {/* Don'ts */}
              <View style={styles.dontsCard}>
                <View style={styles.dontsHeader}>
                  <LinearGradient colors={['#F44336', '#D32F2F']} style={styles.dontsIconContainer}>
                    <Ionicons name="close-circle" size={24} color="#fff" />
                  </LinearGradient>
                  <Text style={styles.dontsTitle}>Don'ts</Text>
                </View>
                {event.dontsList.map((item, index) => (
                  <View key={index} style={styles.dontsItem}>
                    <Ionicons name="close" size={18} color="#F44336" />
                    <Text style={styles.dontsText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Prizes */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="trophy" size={22} color="#667eea" />
                <Text style={styles.sectionTitle}>Prizes</Text>
              </View>
              {event.prizes.map((prize, index) => (
                <View key={index} style={styles.prizeCard3D}>
                  <LinearGradient
                    colors={prize.color}
                    style={styles.prizeCardGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.prizeContent}>
                      <View style={styles.prizeLeft}>
                        <Ionicons
                          name={index === 0 ? 'trophy' : index === 1 ? 'medal' : 'ribbon'}
                          size={32}
                          color="#fff"
                        />
                        <View>
                          <Text style={styles.prizePosition}>{prize.position}</Text>
                          <Text style={styles.prizeTrophy}>{prize.trophy}</Text>
                        </View>
                      </View>
                      <Text style={styles.prizeAmount}>{prize.prize}</Text>
                    </View>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'schedule' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="time" size={22} color="#667eea" />
                <Text style={styles.sectionTitle}>Event Schedule</Text>
              </View>
              <View style={styles.timelineContainer}>
                {event.schedule.map((item, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineLeft}>
                      <Text style={styles.timelineTime}>{item.time}</Text>
                    </View>
                    <View style={styles.timelineCenter}>
                      <View style={styles.timelineDot}>
                        <View style={styles.timelineDotInner} />
                      </View>
                      {index < event.schedule.length - 1 && <View style={styles.timelineLine} />}
                    </View>
                    <View style={styles.timelineRight}>
                      <View style={styles.scheduleCard}>
                        <LinearGradient
                          colors={['#667eea', '#764ba2']}
                          style={styles.scheduleIconContainer}
                        >
                          <Ionicons name={item.icon as any} size={20} color="#fff" />
                        </LinearGradient>
                        <Text style={styles.scheduleActivity}>{item.activity}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === 'rules' && (
          <View style={styles.tabContent}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="list" size={22} color="#667eea" />
                <Text style={styles.sectionTitle}>Tournament Rules</Text>
              </View>
              {event.rules.map((rule, index) => (
                <View key={index} style={styles.ruleCard}>
                  <View style={styles.ruleNumber}>
                    <LinearGradient
                      colors={['#667eea', '#764ba2']}
                      style={styles.ruleNumberGradient}
                    >
                      <Text style={styles.ruleNumberText}>{index + 1}</Text>
                    </LinearGradient>
                  </View>
                  <Text style={styles.ruleText}>{rule}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarContent}>
          <View style={styles.priceSection}>
            <LinearGradient
              colors={event.entryFee === 'Free' ? ['#4CAF50', '#45a049'] : ['#667eea', '#764ba2']}
              style={styles.priceGradient}
            >
              <View>
                <Text style={styles.priceLabel}>Entry Fee</Text>
                <Text style={styles.priceValue}>
                  {event.entryFee === 'Free' ? 'FREE' : `₹${event.entryFee}`}
                </Text>
              </View>
              <View style={styles.spotsLeftBadge}>
                <Ionicons name="people" size={14} color="#fff" />
                <Text style={styles.spotsLeftText}>{spotsLeft} left</Text>
              </View>
            </LinearGradient>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookEvent}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.bookButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name={event.entryFee === 'Free' ? 'checkmark-circle' : 'card'} size={20} color="#fff" />
              <Text style={styles.bookButtonText}>
                {event.entryFee === 'Free' ? 'Join Free' : 'Book Now'}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heroSection: {
    width: width,
    height: height * 0.5,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%',
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerButton3D: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerButtonGradient: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  heroTitleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
  heroTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginBottom: 15,
  },
  quickStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  quickStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  quickStatText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  quickStatDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  organizerSection: {
    padding: 20,
    gap: 15,
  },
  organizerGradient: {
    borderRadius: 15,
    padding: 2,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  organizerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 13,
    padding: 15,
  },
  organizerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  organizerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  organizerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  organizerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  organizerRating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  organizerEvents: {
    fontSize: 12,
    color: '#999',
  },
  contactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  reviewCount: {
    fontSize: 12,
    color: '#999',
  },
  ratingMainRow: {
    flexDirection: 'row',
    gap: 20,
  },
  ratingMainLeft: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingNumber: {
    fontSize: 36,
    fontWeight: '900',
    color: '#667eea',
    marginBottom: 8,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingBreakdown: {
    flex: 1,
    gap: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    width: 70,
  },
  ratingBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  ratingBar: {
    height: '100%',
    backgroundColor: '#FFD700',
  },
  ratingValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
    width: 25,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabActive: {
    shadowColor: '#667eea',
    shadowOpacity: 0.3,
    elevation: 6,
  },
  tabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  longDescription: {
    fontSize: 13,
    color: '#999',
    lineHeight: 20,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityCard: {
    width: (width - 80) / 3,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5FF',
    borderRadius: 12,
  },
  amenityCardDisabled: {
    backgroundColor: '#f5f5f5',
    opacity: 0.6,
  },
  amenityIcon: {
    marginBottom: 8,
  },
  amenityIconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  amenityNameDisabled: {
    color: '#999',
  },
  unavailableBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F44336',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  unavailableText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#fff',
  },
  dosCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  dosHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  dosIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dosTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
  dosItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  dosText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  dontsCard: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: 15,
  },
  dontsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  dontsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dontsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F44336',
  },
  dontsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  dontsText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  prizeCard3D: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  prizeCardGradient: {
    padding: 20,
  },
  prizeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prizeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
  },
  prizePosition: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  prizeTrophy: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  prizeAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  timelineContainer: {
    paddingLeft: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    position: 'relative',
  },
  timelineLeft: {
    width: 80,
    paddingTop: 5,
  },
  timelineTime: {
    fontSize: 12,
    fontWeight: '700',
    color: '#667eea',
  },
  timelineCenter: {
    width: 30,
    alignItems: 'center',
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
    marginBottom: 4,
  },
  timelineRight: {
    flex: 1,
    paddingBottom: 20,
  },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5FF',
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  scheduleIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleActivity: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  ruleCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#F5F5FF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  ruleNumber: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  ruleNumberGradient: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  ruleText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    paddingTop: 6,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomBarContent: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  priceSection: {
    flex: 1,
  },
  priceGradient: {
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
  },
  spotsLeftBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  spotsLeftText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  bookButton: {
    flex: 1.2,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 8,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
