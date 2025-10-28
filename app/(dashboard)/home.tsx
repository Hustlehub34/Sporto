import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Turf {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string;
  distance: string;
  sport: string;
  discount?: number;
  originalPrice?: string;
  playerRequests?: number;
  bookingsCount?: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  playersNeeded: number;
  image: string;
  sport: string;
}

const POPULAR_TURFS: Turf[] = [
  {
    id: '1',
    name: 'Green Valley Cricket Ground',
    location: 'Koramangala',
    rating: 4.8,
    price: '₹1200',
  image:'../../assets/images/turf1.webp',
    distance: '2.5 km',
    sport: 'Cricket',
    playerRequests: 24,
    bookingsCount: 156,
  },
  {
    id: '2',
    name: 'Champions Football Arena',
    location: 'HSR Layout',
    rating: 4.9,
    price: '₹1500',
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
    distance: '3.2 km',
    sport: 'Football',
    playerRequests: 38,
    bookingsCount: 203,
  },
  {
    id: '3',
    name: 'Sports Hub Premium',
    location: 'Whitefield',
    rating: 4.7,
    price: '₹1000',
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
    distance: '5.1 km',
    sport: 'Cricket',
    playerRequests: 17,
    bookingsCount: 128,
  },
];

const NEARBY_TURFS: Turf[] = [
  {
    id: '4',
    name: 'Victory Sports Complex',
    location: 'Indiranagar',
    rating: 4.5,
    price: '₹800',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
    distance: '1.2 km',
    sport: 'Football',
  },
  {
    id: '5',
    name: 'Elite Cricket Ground',
    location: 'Koramangala',
    rating: 4.6,
    price: '₹900',
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80',
    distance: '1.8 km',
    sport: 'Cricket',
  },
  {
    id: '6',
    name: 'Pro Sports Arena',
    location: 'BTM Layout',
    rating: 4.4,
    price: '₹750',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    distance: '2.3 km',
    sport: 'Basketball',
  },
];

const DISCOUNT_TURFS: Turf[] = [
  {
    id: '7',
    name: 'Super Saver Football Ground',
    location: 'Marathahalli',
    rating: 4.3,
    price: '₹700',
    originalPrice: '₹1400',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&q=80',
    distance: '3.8 km',
    sport: 'Football',
  },
  {
    id: '8',
    name: 'Budget Cricket Arena',
    location: 'Electronic City',
    rating: 4.2,
    price: '₹600',
    originalPrice: '₹1000',
    discount: 40,
    image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=80',
    distance: '4.5 km',
    sport: 'Cricket',
  },
  {
    id: '9',
    name: 'Weekend Special Sports Hub',
    location: 'JP Nagar',
    rating: 4.4,
    price: '₹550',
    originalPrice: '₹1100',
    discount: 50,
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
    distance: '3.2 km',
    sport: 'Football',
  },
  {
    id: '10',
    name: 'Value Tennis Courts',
    location: 'Jayanagar',
    rating: 4.1,
    price: '₹450',
    originalPrice: '₹750',
    discount: 40,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80',
    distance: '2.8 km',
    sport: 'Tennis',
  },
];

const FEATURED_TURFS: Turf[] = [
  {
    id: '11',
    name: 'Premium Basketball Arena',
    location: 'Koramangala',
    rating: 4.9,
    price: '₹1800',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    distance: '2.1 km',
    sport: 'Basketball',
  },
  {
    id: '12',
    name: 'Elite Badminton Center',
    location: 'Indiranagar',
    rating: 4.8,
    price: '₹1600',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
    distance: '1.9 km',
    sport: 'Badminton',
  },
  {
    id: '13',
    name: 'Mega Sports Complex',
    location: 'Whitefield',
    rating: 4.7,
    price: '₹2000',
    image: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&q=80',
    distance: '5.5 km',
    sport: 'Football',
  },
];

const UPCOMING_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Weekend Cricket Match',
    date: 'Oct 26',
    time: '6:00 PM',
    location: 'Green Valley',
    playersNeeded: 3,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    sport: 'Cricket',
  },
  {
    id: '2',
    title: 'Football Tournament',
    date: 'Oct 27',
    time: '5:00 PM',
    location: 'Champions Arena',
    playersNeeded: 5,
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80',
    sport: 'Football',
  },
  {
    id: '3',
    title: 'Practice Session',
    date: 'Oct 28',
    time: '7:00 AM',
    location: 'Sports Hub',
    playersNeeded: 2,
    image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&q=80',
    sport: 'Cricket',
  },
];

const SPORT_FILTERS = [
  { id: '1', name: 'All', icon: 'apps' },
  { id: '2', name: 'Football', icon: 'football' },
  { id: '3', name: 'Cricket', icon: 'fitness' },
  { id: '4', name: 'Tennis', icon: 'tennisball' },
  { id: '5', name: 'Basketball', icon: 'basketball' },
  { id: '6', name: 'Badminton', icon: 'american-football' },
];

interface Notification {
  id: string;
  type: 'challenge' | 'event' | 'request';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'challenge',
    title: 'Team Challenge Request',
    message: 'FC Warriors challenged your team for a match on Saturday',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'request',
    title: 'Player Request',
    message: 'Rahul Kumar wants to join your cricket team',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'event',
    title: "Today's Event",
    message: 'Weekend Cricket Match starts in 3 hours at Green Valley',
    time: '8 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'request',
    title: 'Play Request',
    message: 'Amit Singh requested you to play in Football Tournament',
    time: '1 day ago',
    read: true,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const filteredPopularTurfs = selectedSport === 'All'
    ? POPULAR_TURFS
    : POPULAR_TURFS.filter(turf => turf.sport === selectedSport);

  const filteredNearbyTurfs = selectedSport === 'All'
    ? NEARBY_TURFS
    : NEARBY_TURFS.filter(turf => turf.sport === selectedSport);

  const filteredDiscountTurfs = selectedSport === 'All'
    ? DISCOUNT_TURFS
    : DISCOUNT_TURFS.filter(turf => turf.sport === selectedSport);

  const filteredFeaturedTurfs = selectedSport === 'All'
    ? FEATURED_TURFS
    : FEATURED_TURFS.filter(turf => turf.sport === selectedSport);

  const filteredEvents = selectedSport === 'All'
    ? UPCOMING_EVENTS
    : UPCOMING_EVENTS.filter(event => event.sport === selectedSport);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Hello, Player! 🎮</Text>
              <Text style={styles.subtitle}>Ready to dominate today?</Text>
            </View>
            <View style={styles.headerRight}>
              {/* Search Icon */}
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setSearchExpanded(true)}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
                  style={styles.iconButtonGradient}
                >
                  <Ionicons name="search" size={22} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>

              {/* Notification Icon */}
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setNotificationOpen(true)}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.15)']}
                  style={styles.iconButtonGradient}
                >
                  <Ionicons name="notifications" size={22} color="#FFF" />
                  {NOTIFICATIONS.filter(n => !n.read).length > 0 && (
                    <View style={styles.notificationBadge}>
                      <Text style={styles.notificationBadgeText}>
                        {NOTIFICATIONS.filter(n => !n.read).length}
                      </Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Profile */}
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => router.push('/profile')}
              >
                <LinearGradient
                  colors={['#FFD700', '#FFA500']}
                  style={styles.profileGradient}
                >
                  <Image
                    source={{ uri: 'https://via.placeholder.com/80/4CAF50/ffffff?text=U' }}
                    style={styles.profileImage}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sport Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sportFiltersContainer}
          >
            {SPORT_FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.sportFilterButton,
                  selectedSport === filter.name && styles.sportFilterButtonActive,
                ]}
                onPress={() => setSelectedSport(filter.name)}
              >
                <Ionicons
                  name={filter.icon as any}
                  size={18}
                  color={selectedSport === filter.name ? '#fff' : '#666'}
                />
                <Text
                  style={[
                    styles.sportFilterText,
                    selectedSport === filter.name && styles.sportFilterTextActive,
                  ]}
                >
                  {filter.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </LinearGradient>

        {/* Popular Turfs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Popular Turfs</Text>
              <Text style={styles.sectionSubtitle}>Trending near you</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {filteredPopularTurfs.map((turf) => (
              <TouchableOpacity
                key={turf.id}
                style={styles.popularCard}
                activeOpacity={0.9}
                onPress={() => router.push('/turf-detail')}
              >
                <Image source={{ uri: turf.image }} style={styles.popularCardImage} />

                {/* Stats Badges - Subtle */}
                <View style={styles.statsContainer}>
                  <View style={styles.statBadge3D}>
                    <View style={styles.statBadgeInner}>
                      <Ionicons name="people" size={12} color="#FFF" />
                      <View style={styles.statBadgeContent}>
                        <Text style={styles.statBadgeNumber}>{turf.playerRequests}</Text>
                        <Text style={styles.statBadgeLabel}>requests</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.statBadge3D}>
                    <View style={styles.statBadgeInner}>
                      <Ionicons name="calendar" size={12} color="#FFF" />
                      <View style={styles.statBadgeContent}>
                        <Text style={styles.statBadgeNumber}>{turf.bookingsCount}</Text>
                        <Text style={styles.statBadgeLabel}>bookings</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.9)']}
                  style={styles.popularCardGradient}
                >
                  <View style={styles.popularCardBadge}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.popularCardRating}>{turf.rating}</Text>
                    <View style={styles.ratingGlow} />
                  </View>

                  <View style={styles.popularCardInfo}>
                    <Text style={styles.popularCardName}>{turf.name}</Text>
                    <View style={styles.popularCardLocation}>
                      <Ionicons name="location" size={12} color="#fff" />
                      <Text style={styles.popularCardLocationText}>{turf.location}</Text>
                      <Text style={styles.popularCardDistance}>• {turf.distance}</Text>
                    </View>
                    <View style={styles.popularCardFooter}>
                      <LinearGradient
                        colors={['#4CAF50', '#45a049']}
                        style={styles.priceTag3D}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Text style={styles.popularCardPrice}>{turf.price}/hr</Text>
                      </LinearGradient>
                      <View style={styles.sportBadge}>
                        <Text style={styles.sportBadgeText}>{turf.sport}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>


        {/* Upcoming Events Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <Text style={styles.sectionSubtitle}>Join and compete</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {filteredEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                activeOpacity={0.9}
                onPress={() => router.push('/event-detail')}
              >
                <Image source={{ uri: event.image }} style={styles.eventCardImage} />
                <View style={styles.eventCardOverlay}>
                  <View style={styles.eventDateBadge}>
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                </View>
                <View style={styles.eventCardContent}>
                  <Text style={styles.eventCardTitle}>{event.title}</Text>
                  <View style={styles.eventCardDetail}>
                    <Ionicons name="time" size={14} color="#666" />
                    <Text style={styles.eventCardDetailText}>{event.time}</Text>
                  </View>
                  <View style={styles.eventCardDetail}>
                    <Ionicons name="location" size={14} color="#666" />
                    <Text style={styles.eventCardDetailText}>{event.location}</Text>
                  </View>
                  <View style={styles.eventCardFooter}>
                    <View style={styles.playersNeeded}>
                      <Ionicons name="people" size={14} color="#FF9800" />
                      <Text style={styles.playersNeededText}>{event.playersNeeded} needed</Text>
                    </View>
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>Join</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Turfs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Nearby Turfs</Text>
              <Text style={styles.sectionSubtitle}>Closest to you</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {filteredNearbyTurfs.map((turf) => (
              <TouchableOpacity
                key={turf.id}
                style={styles.nearbyCard}
                activeOpacity={0.9}
                onPress={() => router.push('/turf-detail')}
              >
                <Image source={{ uri: turf.image }} style={styles.nearbyCardImage} />
                <View style={styles.nearbyCardContent}>
                  <View style={styles.nearbyCardHeader}>
                    <Text style={styles.nearbyCardName} numberOfLines={1}>{turf.name}</Text>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={10} color="#FFD700" />
                      <Text style={styles.ratingText}>{turf.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.nearbyCardLocation}>
                    <Ionicons name="location" size={12} color="#666" />
                    <Text style={styles.nearbyCardLocationText}>{turf.location}</Text>
                  </View>
                  <View style={styles.nearbyCardFooter}>
                    <Text style={styles.nearbyCardPrice}>{turf.price}/hr</Text>
                    <View style={styles.distanceBadge}>
                      <Ionicons name="navigate" size={10} color="#4CAF50" />
                      <Text style={styles.distanceText}>{turf.distance}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

                {/* Featured Turfs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Featured Turfs</Text>
              <Text style={styles.sectionSubtitle}>Premium venues</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {filteredFeaturedTurfs.map((turf) => (
              <TouchableOpacity
                key={turf.id}
                style={styles.featuredCard}
                activeOpacity={0.9}
                onPress={() => router.push('/turf-detail')}
              >
                <Image source={{ uri: turf.image }} style={styles.featuredCardImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.featuredCardGradient}
                >
                  <View style={styles.featuredBadge}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.featuredBadgeText}>Featured</Text>
                  </View>
                  <View style={styles.featuredCardInfo}>
                    <Text style={styles.featuredCardName}>{turf.name}</Text>
                    <View style={styles.featuredCardDetails}>
                      <View style={styles.featuredCardLocation}>
                        <Ionicons name="location" size={12} color="#fff" />
                        <Text style={styles.featuredCardLocationText}>{turf.location}</Text>
                      </View>
                      <View style={styles.featuredCardRating}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.featuredCardRatingText}>{turf.rating}</Text>
                      </View>
                    </View>
                    <View style={styles.featuredCardFooter}>
                      <Text style={styles.featuredCardPrice}>{turf.price}/hr</Text>
                      <View style={styles.sportBadge}>
                        <Text style={styles.sportBadgeText}>{turf.sport}</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Highest Discount Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Highest Discounts</Text>
              <Text style={styles.sectionSubtitle}>Save big on bookings</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {filteredDiscountTurfs.map((turf) => (
              <TouchableOpacity
                key={turf.id}
                style={styles.discountCard}
                activeOpacity={0.9}
                onPress={() => router.push('/turf-detail')}
              >
                <Image source={{ uri: turf.image }} style={styles.discountCardImage} />
                <View style={styles.discountBadge}>
                  <Ionicons name="pricetag" size={14} color="#fff" />
                  <Text style={styles.discountBadgeText}>{turf.discount}% OFF</Text>
                </View>
                <View style={styles.discountCardContent}>
                  <View style={styles.discountCardHeader}>
                    <Text style={styles.discountCardName} numberOfLines={1}>{turf.name}</Text>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={10} color="#FFD700" />
                      <Text style={styles.ratingText}>{turf.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.discountCardLocation}>
                    <Ionicons name="location" size={12} color="#666" />
                    <Text style={styles.discountCardLocationText}>{turf.location}</Text>
                  </View>
                  <View style={styles.discountCardPricing}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.originalPrice}>{turf.originalPrice}</Text>
                      <Text style={styles.discountedPrice}>{turf.price}/hr</Text>
                    </View>
                    <View style={styles.distanceBadge}>
                      <Ionicons name="navigate" size={10} color="#4CAF50" />
                      <Text style={styles.distanceText}>{turf.distance}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>




        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Search Modal */}
      {searchExpanded && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Search</Text>
              <TouchableOpacity onPress={() => setSearchExpanded(false)}>
                <Ionicons name="close" size={28} color="#1a1a1a" />
              </TouchableOpacity>
            </View>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#666" />
              <TextInput
                style={styles.searchModalInput}
                placeholder="Search turfs, events, locations..."
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
            </View>
          </View>
        </View>
      )}

      {/* Notification Modal */}
      {notificationOpen && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setNotificationOpen(false)}>
                <Ionicons name="close" size={28} color="#1a1a1a" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.notificationList}>
              {NOTIFICATIONS.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationItem,
                    !notification.read && styles.notificationItemUnread,
                  ]}
                >
                  <View style={styles.notificationIcon}>
                    {notification.type === 'challenge' && (
                      <Ionicons name="trophy" size={24} color="#FF9800" />
                    )}
                    {notification.type === 'request' && (
                      <Ionicons name="people" size={24} color="#2196F3" />
                    )}
                    {notification.type === 'event' && (
                      <Ionicons name="calendar" size={24} color="#4CAF50" />
                    )}
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                  {!notification.read && <View style={styles.unreadDot} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}

const { width } = Dimensions.get('window');

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
    marginBottom: 15,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  iconButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  iconButtonGradient: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  profileGradient: {
    width: '100%',
    height: '100%',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  searchIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 12,
    color: '#fff',
    fontWeight: '500',
  },
  filterButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  filterButtonGradient: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportFiltersContainer: {
    paddingRight: 20,
    gap: 10,
  },
  sportFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  sportFilterButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#FFF',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.5,
    elevation: 8,
  },
  sportFilterText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  sportFilterTextActive: {
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  quickActionGradient: {
    padding: 15,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '700',
    textDecorationLine: 'underline',
    textDecorationColor: '#4CAF50',
  },
  horizontalScroll: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  popularCard: {
    width: width * 0.75,
    height: 280,
    borderRadius: 20,
    marginRight: 15,
    overflow: 'visible',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  popularCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  // 3D Stats Container - Floating at the top
  statsContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    gap: 8,
  },
  statBadge3D: {
    flex: 1,
    borderRadius: 10,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  statBadgeInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 9,
    padding: 6,
    paddingHorizontal: 8,
    gap: 6,
  },
  statBadgeContent: {
    flex: 1,
  },
  statBadgeNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 0.3,
  },
  statBadgeLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#FFF',
    opacity: 0.85,
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    opacity: 0.3,
  },
  ratingGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 14,
    backgroundColor: '#FFD700',
    opacity: 0.3,
    zIndex: -1,
  },
  priceTag3D: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  popularCardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  popularCardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
    marginBottom: 10,
  },
  popularCardRating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  popularCardInfo: {
    gap: 6,
  },
  popularCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  popularCardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularCardLocationText: {
    fontSize: 13,
    color: '#fff',
  },
  popularCardDistance: {
    fontSize: 12,
    color: '#ccc',
  },
  popularCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  popularCardPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  sportBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  sportBadgeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '600',
  },
  nearbyCard: {
    width: width * 0.42,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nearbyCardImage: {
    width: '100%',
    height: 120,
  },
  nearbyCardContent: {
    padding: 12,
  },
  nearbyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nearbyCardName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  nearbyCardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  nearbyCardLocationText: {
    fontSize: 12,
    color: '#666',
  },
  nearbyCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nearbyCardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  distanceText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  discountCard: {
    width: width * 0.55,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  discountCardImage: {
    width: '100%',
    height: 140,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF5722',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  discountBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  discountCardContent: {
    padding: 12,
  },
  discountCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  discountCardName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  discountCardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  discountCardLocationText: {
    fontSize: 12,
    color: '#666',
  },
  discountCardPricing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  featuredCard: {
    width: width * 0.65,
    height: 260,
    borderRadius: 20,
    marginRight: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  featuredCardImage: {
    width: '100%',
    height: '100%',
  },
  featuredCardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  featuredCardInfo: {
    gap: 6,
  },
  featuredCardName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
  },
  featuredCardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredCardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredCardLocationText: {
    fontSize: 13,
    color: '#fff',
  },
  featuredCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 3,
  },
  featuredCardRatingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  featuredCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  featuredCardPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  eventCard: {
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  eventCardImage: {
    width: '100%',
    height: 140,
  },
  eventCardOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  eventDateBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  eventDate: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventCardContent: {
    padding: 15,
  },
  eventCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  eventCardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  eventCardDetailText: {
    fontSize: 13,
    color: '#666',
  },
  eventCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  playersNeeded: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
  },
  playersNeededText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FF9800',
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },
  joinButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  // Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
  },
  searchModalInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  // Notification Styles
  notificationList: {
    maxHeight: 500,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  notificationItemUnread: {
    backgroundColor: '#f0f8ff',
    borderColor: '#4CAF50',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 11,
    color: '#999',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginLeft: 8,
  },
});
