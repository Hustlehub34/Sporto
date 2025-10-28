import React, { useState } from 'react';
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
  Modal,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface RequestedPlayer {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  gamesPlayed: number;
  availability: string[];
}

interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
}

const REQUESTED_PLAYERS: RequestedPlayer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    role: 'Batsman',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4.5,
    gamesPlayed: 45,
    availability: ['Mon', 'Wed', 'Fri'],
  },
  {
    id: '2',
    name: 'Amit Singh',
    role: 'Bowler',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 4.7,
    gamesPlayed: 62,
    availability: ['Tue', 'Thu', 'Sat'],
  },
  {
    id: '3',
    name: 'Vikas Sharma',
    role: 'All-Rounder',
    avatar: 'https://i.pravatar.cc/150?img=51',
    rating: 4.8,
    gamesPlayed: 78,
    availability: ['Mon', 'Wed', 'Sat'],
  },
  {
    id: '4',
    name: 'Pradeep Reddy',
    role: 'Wicket Keeper',
    avatar: 'https://i.pravatar.cc/150?img=68',
    rating: 4.6,
    gamesPlayed: 54,
    availability: ['Mon', 'Thu', 'Sun'],
  },
];

const TIME_SLOTS: TimeSlot[] = [
  { time: '6:00 AM', available: true, price: 400 },
  { time: '7:00 AM', available: false, price: 400 },
  { time: '8:00 AM', available: true, price: 500 },
  { time: '9:00 AM', available: true, price: 500 },
  { time: '10:00 AM', available: false, price: 500 },
  { time: '11:00 AM', available: true, price: 600 },
  { time: '12:00 PM', available: true, price: 600 },
  { time: '1:00 PM', available: true, price: 600 },
  { time: '2:00 PM', available: false, price: 600 },
  { time: '3:00 PM', available: true, price: 700 },
  { time: '4:00 PM', available: true, price: 700 },
  { time: '5:00 PM', available: true, price: 800 },
  { time: '6:00 PM', available: false, price: 800 },
  { time: '7:00 PM', available: true, price: 1000 },
  { time: '8:00 PM', available: true, price: 1000 },
  { time: '9:00 PM', available: false, price: 900 },
];

export default function TurfDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('28 Oct 2025');
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'full' | 'advance'>('full');

  // Dummy data - in real app this would come from params/API by ID
  const turf = {
    id: params.id || '1',
    name: 'Green Field Sports Complex',
    location: 'Koramangala, Bangalore',
    fullAddress: 'Gate No 10, Sports Complex Road, Koramangala, Bangalore - 560034',
    rating: 4.7,
    reviews: 156,
    price: 800,
    originalPrice: 1000,
    discount: 20,
    sports: ['Cricket', 'Football', 'Badminton'],
    timing: '6 AM - 10 PM',
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
      'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
    ],
    amenities: [
      { name: 'Parking', icon: 'car-outline' },
      { name: 'Washroom', icon: 'water-outline' },
      { name: 'Changing Room', icon: 'shirt-outline' },
      { name: 'Water', icon: 'water-outline' },
      { name: 'First Aid', icon: 'medical-outline' },
      { name: 'Lighting', icon: 'bulb-outline' },
    ],
    description: 'Premium quality turf with world-class facilities. Perfect for professional training and friendly matches. Well-maintained surface suitable for all age groups. Our turf features advanced drainage systems, FIFA-approved grass, and professional lighting for night games.',
  };

  const handleRequestPlayer = (player: RequestedPlayer) => {
    Alert.alert(
      'Send Play Request? 🏏',
      `Send a request to ${player.name} to join your game?\n\nRole: ${player.role}\nRating: ${player.rating}⭐\nGames: ${player.gamesPlayed}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Request',
          onPress: () => {
            Alert.alert('Request Sent! 🎉', `Your play request has been sent to ${player.name}. They will be notified.`);
          },
        },
      ]
    );
  };

  const toggleSlot = (time: string) => {
    if (selectedSlots.includes(time)) {
      setSelectedSlots(selectedSlots.filter(s => s !== time));
    } else {
      setSelectedSlots([...selectedSlots, time]);
    }
  };

  const getTotalAmount = () => {
    return selectedSlots.reduce((total, time) => {
      const slot = TIME_SLOTS.find(s => s.time === time);
      return total + (slot?.price || 0);
    }, 0);
  };

  const handleContinueToPayment = () => {
    if (selectedSlots.length === 0) {
      Alert.alert('No Slot Selected', 'Please select at least one time slot to continue.');
      return;
    }
    setShowBookingModal(false);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    const totalAmount = getTotalAmount();
    const platformFee = 20;
    const paymentAmount = paymentType === 'advance' ? Math.floor(totalAmount * 0.3) : totalAmount;
    const finalAmount = paymentAmount + platformFee;

    Alert.alert(
      'Select Payment Method 💳',
      `Amount: ₹${paymentAmount}\nPlatform Fee: ₹${platformFee}\nTotal: ₹${finalAmount}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay with UPI',
          onPress: () => {
            setShowPaymentModal(false);
            Alert.alert(
              'Payment Successful! 🎉',
              `Your booking is confirmed!\n\nAmount Paid: ₹${finalAmount}\n${paymentType === 'advance' ? `Remaining: ₹${totalAmount - paymentAmount}\n` : ''}Transaction ID: TXN${Math.floor(Math.random() * 1000000)}`
            );
          },
        },
        {
          text: 'Pay with Card',
          onPress: () => {
            setShowPaymentModal(false);
            Alert.alert(
              'Payment Successful! 🎉',
              `Your booking is confirmed!\n\nAmount Paid: ₹${finalAmount}\n${paymentType === 'advance' ? `Remaining: ₹${totalAmount - paymentAmount}\n` : ''}Transaction ID: TXN${Math.floor(Math.random() * 1000000)}`
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: turf.images[currentImageIndex] }} style={styles.heroImage} />

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

          {/* Discount Badge */}
          {turf.discount > 0 && (
            <View style={styles.discountBadge}>
              <LinearGradient
                colors={['#FF9800', '#F57C00']}
                style={styles.discountBadgeGradient}
              >
                <Ionicons name="pricetag" size={14} color="#fff" />
                <Text style={styles.discountText}>{turf.discount}% OFF</Text>
              </LinearGradient>
            </View>
          )}

          {/* Image Indicators */}
          <View style={styles.imageIndicators}>
            {turf.images.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentImageIndex(index)}
                style={[
                  styles.indicator,
                  currentImageIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>

          {/* Turf Title on Image */}
          <View style={styles.heroTitleContainer}>
            <Text style={styles.heroTitle}>{turf.name}</Text>
            <View style={styles.heroLocationRow}>
              <Ionicons name="location" size={14} color="rgba(255,255,255,0.9)" />
              <Text style={styles.heroLocation}>{turf.location}</Text>
            </View>
          </View>
        </View>

        {/* Rating & Info Card */}
        <View style={styles.infoCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.infoCardGradient}
          >
            <View style={styles.infoCardContent}>
              <View style={styles.ratingSection}>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text style={styles.ratingText}>{turf.rating}</Text>
                </View>
                <Text style={styles.reviewsText}>{turf.reviews} reviews</Text>
              </View>

              <View style={styles.timingSection}>
                <Ionicons name="time" size={18} color="#fff" />
                <Text style={styles.timingText}>{turf.timing}</Text>
              </View>

              <View style={styles.priceSection}>
                <Text style={styles.priceLabel}>Per Hour</Text>
                <Text style={styles.priceValue}>₹{turf.price}</Text>
                {turf.originalPrice > turf.price && (
                  <Text style={styles.originalPriceText}>₹{turf.originalPrice}</Text>
                )}
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={22} color="#667eea" />
            <Text style={styles.sectionTitle}>About This Turf</Text>
          </View>
          <Text style={styles.description}>{turf.description}</Text>
        </View>

        {/* Available Sports */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="basketball" size={22} color="#667eea" />
            <Text style={styles.sectionTitle}>Available Sports</Text>
          </View>
          <View style={styles.sportsGrid}>
            {turf.sports.map((sport, index) => (
              <View key={index} style={styles.sportCard}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.sportCardGradient}
                >
                  <Ionicons name="tennisball" size={24} color="#fff" />
                  <Text style={styles.sportCardText}>{sport}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={22} color="#667eea" />
            <Text style={styles.sectionTitle}>Amenities</Text>
          </View>
          <View style={styles.amenitiesGrid}>
            {turf.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityCard}>
                <View style={styles.amenityIcon}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.amenityIconGradient}
                  >
                    <Ionicons name={amenity.icon as any} size={20} color="#fff" />
                  </LinearGradient>
                </View>
                <Text style={styles.amenityName}>{amenity.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Requested Players Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={22} color="#667eea" />
            <Text style={styles.sectionTitle}>Players Looking to Play Here</Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            Connect with these players and form your team!
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.playersScroll}>
            {REQUESTED_PLAYERS.map((player) => (
              <TouchableOpacity
                key={player.id}
                style={styles.playerCard}
                onPress={() => handleRequestPlayer(player)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: player.avatar }} style={styles.playerAvatar} />
                <View style={styles.playerOnlineDot} />
                <Text style={styles.playerName} numberOfLines={1}>{player.name}</Text>
                <View style={styles.playerRoleBadge}>
                  <LinearGradient
                    colors={['#FF9800', '#F57C00']}
                    style={styles.playerRoleGradient}
                  >
                    <Text style={styles.playerRoleText}>{player.role}</Text>
                  </LinearGradient>
                </View>
                <View style={styles.playerStats}>
                  <View style={styles.playerStatItem}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.playerStatText}>{player.rating}</Text>
                  </View>
                  <View style={styles.playerStatItem}>
                    <Ionicons name="trophy" size={12} color="#667eea" />
                    <Text style={styles.playerStatText}>{player.gamesPlayed}</Text>
                  </View>
                </View>
                <View style={styles.playerAvailability}>
                  {player.availability.map((day, idx) => (
                    <View key={idx} style={styles.dayChip}>
                      <Text style={styles.dayChipText}>{day}</Text>
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.requestButton}
                  onPress={() => handleRequestPlayer(player)}
                >
                  <LinearGradient
                    colors={['#4CAF50', '#45a049']}
                    style={styles.requestButtonGradient}
                  >
                    <Ionicons name="person-add" size={14} color="#fff" />
                    <Text style={styles.requestButtonText}>Request</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarContent}>
          <View style={styles.bottomPriceSection}>
            <Text style={styles.bottomPriceLabel}>Starting from</Text>
            <Text style={styles.bottomPriceValue}>₹{turf.price}/hr</Text>
          </View>

          <TouchableOpacity
            style={styles.bookNowButton}
            onPress={() => setShowBookingModal(true)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.bookNowGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="calendar" size={20} color="#fff" />
              <Text style={styles.bookNowText}>Book Now</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Select Time Slots</Text>
              <TouchableOpacity
                onPress={() => setShowBookingModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Date Selection */}
              <View style={styles.dateSection}>
                <Text style={styles.dateSectionTitle}>Select Date</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesScroll}>
                  {['28 Oct', '29 Oct', '30 Oct', '31 Oct', '1 Nov'].map((date, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.dateChip,
                        selectedDate === date + ' 2025' && styles.dateChipActive,
                      ]}
                      onPress={() => setSelectedDate(date + ' 2025')}
                    >
                      {selectedDate === date + ' 2025' ? (
                        <LinearGradient
                          colors={['#4CAF50', '#45a049']}
                          style={styles.dateChipGradient}
                        >
                          <Text style={styles.dateChipTextActive}>{date}</Text>
                        </LinearGradient>
                      ) : (
                        <Text style={styles.dateChipText}>{date}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Time Slots Grid */}
              <View style={styles.slotsSection}>
                <Text style={styles.slotsSectionTitle}>Available Time Slots</Text>
                <View style={styles.slotsLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
                    <Text style={styles.legendText}>Available</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
                    <Text style={styles.legendText}>Booked</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#667eea' }]} />
                    <Text style={styles.legendText}>Selected</Text>
                  </View>
                </View>

                <View style={styles.slotsGrid}>
                  {TIME_SLOTS.map((slot, index) => {
                    const isSelected = selectedSlots.includes(slot.time);
                    const isAvailable = slot.available;

                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.slotCard,
                          !isAvailable && styles.slotCardBooked,
                          isSelected && styles.slotCardSelected,
                        ]}
                        onPress={() => isAvailable && toggleSlot(slot.time)}
                        disabled={!isAvailable}
                        activeOpacity={0.8}
                      >
                        {isSelected ? (
                          <LinearGradient
                            colors={['#667eea', '#764ba2']}
                            style={styles.slotCardGradient}
                          >
                            <Ionicons name="checkmark-circle" size={20} color="#fff" />
                            <Text style={styles.slotTimeSelected}>{slot.time}</Text>
                            <Text style={styles.slotPriceSelected}>₹{slot.price}</Text>
                          </LinearGradient>
                        ) : (
                          <>
                            <Text style={[
                              styles.slotTime,
                              !isAvailable && styles.slotTimeBooked,
                            ]}>
                              {slot.time}
                            </Text>
                            <Text style={[
                              styles.slotPrice,
                              !isAvailable && styles.slotPriceBooked,
                            ]}>
                              ₹{slot.price}
                            </Text>
                            {!isAvailable && (
                              <View style={styles.bookedBadge}>
                                <Text style={styles.bookedBadgeText}>Booked</Text>
                              </View>
                            )}
                          </>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {selectedSlots.length > 0 && (
                <View style={styles.selectionSummary}>
                  <Text style={styles.summaryTitle}>Selected Slots ({selectedSlots.length})</Text>
                  <View style={styles.summarySlots}>
                    {selectedSlots.map((time, idx) => (
                      <View key={idx} style={styles.summarySlot}>
                        <Text style={styles.summarySlotText}>{time}</Text>
                        <TouchableOpacity onPress={() => toggleSlot(time)}>
                          <Ionicons name="close-circle" size={18} color="#F44336" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount:</Text>
                    <Text style={styles.totalValue}>₹{getTotalAmount()}</Text>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinueToPayment}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#4CAF50', '#45a049']}
                  style={styles.continueButtonGradient}
                >
                  <Text style={styles.continueButtonText}>
                    Continue {selectedSlots.length > 0 && `(₹${getTotalAmount()})`}
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Payment Modal */}
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Payment Options</Text>
              <TouchableOpacity
                onPress={() => setShowPaymentModal(false)}
                style={styles.modalCloseButton}
              >
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              {/* Booking Summary */}
              <View style={styles.bookingSummary}>
                <Text style={styles.summaryTitle}>Booking Summary</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Date:</Text>
                  <Text style={styles.summaryValue}>{selectedDate}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Slots:</Text>
                  <Text style={styles.summaryValue}>{selectedSlots.length} slot(s)</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal:</Text>
                  <Text style={styles.summaryValue}>₹{getTotalAmount()}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Platform Fee:</Text>
                  <Text style={styles.summaryValue}>₹20</Text>
                </View>
              </View>

              {/* Payment Type Selection */}
              <View style={styles.paymentTypeSection}>
                <Text style={styles.paymentTypeTitle}>Choose Payment Option</Text>

                {/* Full Payment */}
                <TouchableOpacity
                  style={[
                    styles.paymentTypeCard,
                    paymentType === 'full' && styles.paymentTypeCardActive,
                  ]}
                  onPress={() => setPaymentType('full')}
                  activeOpacity={0.8}
                >
                  {paymentType === 'full' ? (
                    <LinearGradient
                      colors={['#4CAF50', '#45a049']}
                      style={styles.paymentTypeGradient}
                    >
                      <View style={styles.paymentTypeHeader}>
                        <Ionicons name="card" size={24} color="#fff" />
                        <Text style={styles.paymentTypeTitleActive}>Full Payment</Text>
                        <Ionicons name="checkmark-circle" size={24} color="#fff" />
                      </View>
                      <Text style={styles.paymentTypeDescActive}>
                        Pay the complete amount now
                      </Text>
                      <Text style={styles.paymentTypeAmountActive}>
                        ₹{getTotalAmount() + 20}
                      </Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.paymentTypeContent}>
                      <View style={styles.paymentTypeHeader}>
                        <Ionicons name="card-outline" size={24} color="#667eea" />
                        <Text style={styles.paymentTypeTitleInactive}>Full Payment</Text>
                      </View>
                      <Text style={styles.paymentTypeDescInactive}>
                        Pay the complete amount now
                      </Text>
                      <Text style={styles.paymentTypeAmountInactive}>
                        ₹{getTotalAmount() + 20}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* 30% Advance Payment */}
                <TouchableOpacity
                  style={[
                    styles.paymentTypeCard,
                    paymentType === 'advance' && styles.paymentTypeCardActive,
                  ]}
                  onPress={() => setPaymentType('advance')}
                  activeOpacity={0.8}
                >
                  {paymentType === 'advance' ? (
                    <LinearGradient
                      colors={['#FF9800', '#F57C00']}
                      style={styles.paymentTypeGradient}
                    >
                      <View style={styles.paymentTypeHeader}>
                        <Ionicons name="wallet" size={24} color="#fff" />
                        <Text style={styles.paymentTypeTitleActive}>30% Advance</Text>
                        <Ionicons name="checkmark-circle" size={24} color="#fff" />
                      </View>
                      <Text style={styles.paymentTypeDescActive}>
                        Pay 30% now, rest at venue
                      </Text>
                      <Text style={styles.paymentTypeAmountActive}>
                        ₹{Math.floor(getTotalAmount() * 0.3) + 20}
                      </Text>
                      <Text style={styles.remainingText}>
                        Remaining: ₹{Math.floor(getTotalAmount() * 0.7)}
                      </Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.paymentTypeContent}>
                      <View style={styles.paymentTypeHeader}>
                        <Ionicons name="wallet-outline" size={24} color="#667eea" />
                        <Text style={styles.paymentTypeTitleInactive}>30% Advance</Text>
                      </View>
                      <Text style={styles.paymentTypeDescInactive}>
                        Pay 30% now, rest at venue
                      </Text>
                      <Text style={styles.paymentTypeAmountInactive}>
                        ₹{Math.floor(getTotalAmount() * 0.3) + 20}
                      </Text>
                      <Text style={styles.remainingTextInactive}>
                        Remaining: ₹{Math.floor(getTotalAmount() * 0.7)}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                {/* Coins Option - Coming Soon */}
                <View style={styles.coinsCard}>
                  <LinearGradient
                    colors={['#ccc', '#999']}
                    style={styles.coinsGradient}
                  >
                    <View style={styles.coinsHeader}>
                      <Ionicons name="wallet" size={24} color="#fff" />
                      <Text style={styles.coinsTitle}>Pay with Coins</Text>
                      <View style={styles.comingSoonBadge}>
                        <Text style={styles.comingSoonText}>Coming Soon</Text>
                      </View>
                    </View>
                    <Text style={styles.coinsDesc}>
                      Earn and redeem coins for discounts
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            </ScrollView>

            {/* Payment Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.payButton}
                onPress={handlePayment}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.payButtonGradient}
                >
                  <Ionicons name="card" size={20} color="#fff" />
                  <Text style={styles.payButtonText}>
                    Pay ₹{paymentType === 'advance' ? Math.floor(getTotalAmount() * 0.3) + 20 : getTotalAmount() + 20}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
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
    height: '70%',
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
  discountBadge: {
    position: 'absolute',
    top: 110,
    right: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  discountBadgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 5,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  imageIndicators: {
    position: 'absolute',
    top: 110,
    left: 20,
    flexDirection: 'row',
    gap: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  activeIndicator: {
    backgroundColor: '#fff',
    width: 24,
  },
  heroTitleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroLocation: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  infoCard: {
    marginHorizontal: 20,
    marginTop: -30,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  infoCardGradient: {
    padding: 2,
  },
  infoCardContent: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 13,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingSection: {
    alignItems: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  reviewsText: {
    fontSize: 11,
    color: '#999',
  },
  timingSection: {
    alignItems: 'center',
    gap: 6,
  },
  timingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#667eea',
  },
  priceSection: {
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#4CAF50',
  },
  originalPriceText: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
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
  sectionSubtitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sportCard: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  sportCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  sportCardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  amenityCard: {
    width: (width - 80) / 3,
    alignItems: 'center',
  },
  amenityIcon: {
    marginBottom: 8,
    borderRadius: 25,
    overflow: 'hidden',
  },
  amenityIconGradient: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amenityName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  playersScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  playerCard: {
    width: 160,
    backgroundColor: '#F5F5FF',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  playerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  playerOnlineDot: {
    position: 'absolute',
    top: 15,
    right: 45,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  playerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 6,
  },
  playerRoleBadge: {
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  playerRoleGradient: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  playerRoleText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  playerStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 10,
  },
  playerStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  playerStatText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  playerAvailability: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginBottom: 12,
  },
  dayChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dayChipText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#667eea',
  },
  requestButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  requestButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  requestButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
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
    alignItems: 'center',
    gap: 15,
  },
  bottomPriceSection: {
    flex: 1,
  },
  bottomPriceLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  bottomPriceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#667eea',
  },
  bookNowButton: {
    flex: 2,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  bookNowGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 8,
  },
  bookNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: height * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    maxHeight: height * 0.6,
  },
  dateSection: {
    padding: 20,
    paddingBottom: 10,
  },
  dateSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  datesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  dateChip: {
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  dateChipActive: {
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  dateChipGradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  dateChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  dateChipTextActive: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  slotsSection: {
    padding: 20,
    paddingTop: 10,
  },
  slotsSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  slotsLegend: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 11,
    color: '#666',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  slotCard: {
    width: (width - 60) / 3,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8F5E9',
  },
  slotCardBooked: {
    backgroundColor: '#FFEBEE',
    borderColor: '#FFEBEE',
    opacity: 0.6,
  },
  slotCardSelected: {
    borderColor: '#667eea',
  },
  slotCardGradient: {
    width: '100%',
    alignItems: 'center',
    gap: 4,
  },
  slotTime: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 4,
  },
  slotTimeBooked: {
    color: '#F44336',
  },
  slotTimeSelected: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  slotPrice: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  slotPriceBooked: {
    color: '#999',
  },
  slotPriceSelected: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  bookedBadge: {
    marginTop: 4,
    backgroundColor: '#F44336',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bookedBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
  },
  selectionSummary: {
    margin: 20,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#F5F5FF',
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  summarySlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  summarySlot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  summarySlotText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667eea',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#667eea',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  bookingSummary: {
    margin: 20,
    padding: 15,
    backgroundColor: '#F5F5FF',
    borderRadius: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#666',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  paymentTypeSection: {
    padding: 20,
    paddingTop: 10,
  },
  paymentTypeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  paymentTypeCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#F5F5FF',
  },
  paymentTypeCardActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  paymentTypeGradient: {
    padding: 20,
  },
  paymentTypeContent: {
    padding: 20,
  },
  paymentTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  paymentTypeTitleActive: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  paymentTypeTitleInactive: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  paymentTypeDescActive: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
  },
  paymentTypeDescInactive: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  paymentTypeAmountActive: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  paymentTypeAmountInactive: {
    fontSize: 24,
    fontWeight: '900',
    color: '#667eea',
  },
  remainingText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  remainingTextInactive: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  coinsCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  coinsGradient: {
    padding: 20,
  },
  coinsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  coinsTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  comingSoonBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  coinsDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  payButton: {
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  payButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
