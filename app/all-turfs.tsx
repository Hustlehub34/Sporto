import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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
  amenities?: string[];
}

const ALL_TURFS: Turf[] = [
  // Popular Turfs
  {
    id: '1',
    name: 'Green Valley Cricket Ground',
    location: 'Koramangala',
    rating: 4.8,
    price: '₹1200',
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80',
    distance: '2.5 km',
    sport: 'Cricket',
    playerRequests: 24,
    bookingsCount: 156,
    amenities: ['Parking', 'Changing Room', 'Flood Lights', 'Water'],
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
    amenities: ['Parking', 'Changing Room', 'Flood Lights', 'First Aid'],
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
    amenities: ['Parking', 'Cafeteria', 'Flood Lights', 'Coaching'],
  },
  // Nearby Turfs
  {
    id: '4',
    name: 'Victory Sports Complex',
    location: 'Indiranagar',
    rating: 4.5,
    price: '₹800',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
    distance: '1.2 km',
    sport: 'Football',
    amenities: ['Parking', 'Water', 'Changing Room'],
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
    amenities: ['Flood Lights', 'Pavilion', 'Scoring Board'],
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
    amenities: ['Indoor', 'AC', 'Changing Room', 'Water'],
  },
  // Discount Turfs
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
    amenities: ['Parking', 'Basic Amenities'],
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
    amenities: ['Basic Amenities', 'Parking'],
  },
  // Featured Turfs
  {
    id: '9',
    name: 'Premium Basketball Arena',
    location: 'Koramangala',
    rating: 4.9,
    price: '₹1800',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    distance: '2.1 km',
    sport: 'Basketball',
    amenities: ['Indoor', 'AC', 'Pro Court', 'Locker Room'],
  },
  {
    id: '10',
    name: 'Elite Badminton Center',
    location: 'Indiranagar',
    rating: 4.8,
    price: '₹1600',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
    distance: '1.9 km',
    sport: 'Badminton',
    amenities: ['Indoor', 'AC', 'Pro Courts', 'Coaching'],
  },
];

const SPORT_FILTERS = [
  { id: 'all', name: 'All', icon: 'apps' },
  { id: 'football', name: 'Football', icon: 'football' },
  { id: 'cricket', name: 'Cricket', icon: 'fitness' },
  { id: 'basketball', name: 'Basketball', icon: 'basketball' },
  { id: 'badminton', name: 'Badminton', icon: 'tennisball' },
];

const SORT_OPTIONS = [
  { id: 'popular', name: 'Most Popular', icon: 'trending-up' },
  { id: 'rating', name: 'Highest Rated', icon: 'star' },
  { id: 'price_low', name: 'Price: Low to High', icon: 'arrow-up' },
  { id: 'price_high', name: 'Price: High to Low', icon: 'arrow-down' },
  { id: 'distance', name: 'Nearest First', icon: 'location' },
];

export default function AllTurfsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const category = params.category as string || 'all';

  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedSort, setSelectedSort] = useState('popular');
  const [showSortModal, setShowSortModal] = useState(false);
  const [turfs, setTurfs] = useState(ALL_TURFS);

  const filterAndSortTurfs = () => {
    let filtered = [...ALL_TURFS];

    // Filter by sport
    if (selectedSport !== 'all') {
      filtered = filtered.filter(
        turf => turf.sport.toLowerCase() === selectedSport.toLowerCase()
      );
    }

    // Sort turfs
    switch (selectedSort) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low':
        filtered.sort((a, b) =>
          parseInt(a.price.replace(/[^0-9]/g, '')) -
          parseInt(b.price.replace(/[^0-9]/g, ''))
        );
        break;
      case 'price_high':
        filtered.sort((a, b) =>
          parseInt(b.price.replace(/[^0-9]/g, '')) -
          parseInt(a.price.replace(/[^0-9]/g, ''))
        );
        break;
      case 'distance':
        filtered.sort((a, b) =>
          parseFloat(a.distance) - parseFloat(b.distance)
        );
        break;
      default:
        // Popular - sort by bookings
        filtered.sort((a, b) => (b.bookingsCount || 0) - (a.bookingsCount || 0));
    }

    return filtered;
  };

  const filteredTurfs = filterAndSortTurfs();

  const renderTurfCard = ({ item }: { item: Turf }) => (
    <TouchableOpacity
      style={styles.turfCard}
      activeOpacity={0.9}
      onPress={() => router.push('/turf-detail')}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.turfImage} />

        {item.discount && (
          <View style={styles.discountBadge}>
            <LinearGradient
              colors={['#FF5722', '#FF3D00']}
              style={styles.discountGradient}
            >
              <Text style={styles.discountText}>{item.discount}% OFF</Text>
            </LinearGradient>
          </View>
        )}

        <View style={styles.ratingBadge}>
          <LinearGradient
            colors={['rgba(76,175,80,0.95)', 'rgba(69,160,73,0.95)']}
            style={styles.ratingGradient}
          >
            <Ionicons name="star" size={14} color="#FFF" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </LinearGradient>
        </View>

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageOverlay}
        />
      </View>

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.titleSection}>
            <Text style={styles.turfName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={12} color="#667eea" />
              <Text style={styles.locationText}>{item.location}</Text>
              <Text style={styles.distanceText}>• {item.distance}</Text>
            </View>
          </View>

          <View style={styles.sportBadge}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.sportGradient}
            >
              <Ionicons
                name={
                  item.sport === 'Cricket' ? 'fitness' :
                  item.sport === 'Football' ? 'football' :
                  item.sport === 'Basketball' ? 'basketball' : 'tennisball'
                }
                size={14}
                color="#FFF"
              />
            </LinearGradient>
          </View>
        </View>

        {item.amenities && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.amenitiesContainer}
          >
            {item.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityChip}>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        <View style={styles.cardFooter}>
          <View style={styles.priceSection}>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>{item.originalPrice}</Text>
            )}
            <Text style={styles.price}>{item.price}/hr</Text>
          </View>

          <View style={styles.statsSection}>
            {item.playerRequests && (
              <View style={styles.statItem}>
                <Ionicons name="people" size={14} color="#667eea" />
                <Text style={styles.statText}>{item.playerRequests}</Text>
              </View>
            )}
            {item.bookingsCount && (
              <View style={styles.statItem}>
                <Ionicons name="calendar" size={14} color="#f093fb" />
                <Text style={styles.statText}>{item.bookingsCount}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.bookButton}>
            <LinearGradient
              colors={['#f093fb', '#f5576c']}
              style={styles.bookGradient}
            >
              <Text style={styles.bookText}>Book</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>All Turfs</Text>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowSortModal(true)}
          >
            <Ionicons name="filter" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerBottom}>
          <Text style={styles.resultsCount}>
            {filteredTurfs.length} turfs available
          </Text>

          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setShowSortModal(true)}
          >
            <Ionicons name="swap-vertical" size={16} color="#FFF" />
            <Text style={styles.sortButtonText}>
              {SORT_OPTIONS.find(s => s.id === selectedSort)?.name || 'Sort'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sport Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {SPORT_FILTERS.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedSport === filter.id && styles.filterChipActive
              ]}
              onPress={() => setSelectedSport(filter.id)}
            >
              <Ionicons
                name={filter.icon as any}
                size={16}
                color={selectedSport === filter.id ? '#FFF' : 'rgba(255,255,255,0.7)'}
              />
              <Text
                style={[
                  styles.filterText,
                  selectedSport === filter.id && styles.filterTextActive
                ]}
              >
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* Turf List */}
      <FlatList
        data={filteredTurfs}
        renderItem={renderTurfCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Sort Modal */}
      {showSortModal && (
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSortModal(false)}
        >
          <View style={styles.sortModal}>
            <Text style={styles.modalTitle}>Sort By</Text>
            {SORT_OPTIONS.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.sortOption,
                  selectedSort === option.id && styles.sortOptionActive
                ]}
                onPress={() => {
                  setSelectedSort(option.id);
                  setShowSortModal(false);
                }}
              >
                <Ionicons
                  name={option.icon as any}
                  size={20}
                  color={selectedSort === option.id ? '#667eea' : '#666'}
                />
                <Text
                  style={[
                    styles.sortOptionText,
                    selectedSort === option.id && styles.sortOptionTextActive
                  ]}
                >
                  {option.name}
                </Text>
                {selectedSort === option.id && (
                  <Ionicons name="checkmark" size={20} color="#667eea" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
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
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  resultsCount: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 6,
  },
  sortButtonText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
  },
  filterContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  filterText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFF',
  },
  listContainer: {
    padding: 15,
  },
  turfCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  turfImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  discountBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  discountGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  ratingBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  ratingGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleSection: {
    flex: 1,
  },
  turfName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    color: '#667eea',
  },
  distanceText: {
    fontSize: 13,
    color: '#999',
  },
  sportBadge: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  sportGradient: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenitiesContainer: {
    marginBottom: 12,
  },
  amenityChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 8,
  },
  amenityText: {
    fontSize: 11,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  bookButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  bookGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bookText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sortModal: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
    textAlign: 'center',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 12,
  },
  sortOptionActive: {
    backgroundColor: '#f0f0ff',
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  sortOptionText: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  sortOptionTextActive: {
    color: '#667eea',
    fontWeight: '600',
  },
});