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

interface TurfRequest {
  id: string;
  turfName: string;
  turfImage: string;
  sport: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  price: number;
  skillLevel: string;
  availableSlots: number;
}

interface PlayerRole {
  id: string;
  name: string;
  icon: string;
  color: [string, string];
}

interface DayAvailability {
  day: string;
  selected: boolean;
  fromTime: string;
  toTime: string;
}

const PLAYER_ROLES: PlayerRole[] = [
  { id: '1', name: 'Batsman', icon: '🏏', color: ['#4CAF50', '#45a049'] },
  { id: '2', name: 'Bowler', icon: '⚡', color: ['#2196F3', '#1976D2'] },
  { id: '3', name: 'All-Rounder', icon: '⭐', color: ['#FF9800', '#F57C00'] },
  { id: '4', name: 'Wicket Keeper', icon: '🧤', color: ['#9C27B0', '#7B1FA2'] },
  { id: '5', name: 'Fielder', icon: '🎯', color: ['#00BCD4', '#0097A7'] },
];

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TIME_SLOTS = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM',
];

const TURF_REQUESTS: TurfRequest[] = [
  {
    id: '1',
    turfName: 'Green Valley Cricket Ground',
    turfImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    sport: 'Cricket',
    date: 'Oct 26, 2024',
    time: '6:00 PM',
    location: 'Koramangala',
    distance: '2.5 km',
    price: 1200,
    skillLevel: 'Intermediate',
    availableSlots: 3,
  },
  {
    id: '2',
    turfName: 'Champions Football Arena',
    turfImage: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
    sport: 'Football',
    date: 'Oct 27, 2024',
    time: '5:00 PM',
    location: 'HSR Layout',
    distance: '3.2 km',
    price: 1500,
    skillLevel: 'Advanced',
    availableSlots: 5,
  },
  {
    id: '3',
    turfName: 'Sports Hub Premium',
    turfImage: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
    sport: 'Cricket',
    date: 'Oct 28, 2024',
    time: '7:00 AM',
    location: 'Whitefield',
    distance: '5.1 km',
    price: 1000,
    skillLevel: 'Beginner',
    availableSlots: 2,
  },
];

interface Player {
  id: string;
  name: string;
  avatar: string;
  role: string;
  skillLevel: string;
  rating: number;
  location: string;
  distance: string;
  matchesPlayed: number;
  sports: string[];
}

const AVAILABLE_PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Rahul Kumar',
    avatar: 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=667eea&color=fff&size=200',
    role: 'All-Rounder',
    skillLevel: 'Advanced',
    rating: 4.8,
    location: 'Koramangala',
    distance: '1.2 km',
    matchesPlayed: 45,
    sports: ['Cricket', 'Football'],
  },
  {
    id: '2',
    name: 'Amit Singh',
    avatar: 'https://ui-avatars.com/api/?name=Amit+Singh&background=764ba2&color=fff&size=200',
    role: 'Bowler',
    skillLevel: 'Professional',
    rating: 4.9,
    location: 'HSR Layout',
    distance: '2.8 km',
    matchesPlayed: 78,
    sports: ['Cricket'],
  },
  {
    id: '3',
    name: 'Priya Sharma',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=f093fb&color=fff&size=200',
    role: 'Batsman',
    skillLevel: 'Intermediate',
    rating: 4.6,
    location: 'Indiranagar',
    distance: '3.5 km',
    matchesPlayed: 32,
    sports: ['Cricket', 'Tennis'],
  },
  {
    id: '4',
    name: 'Vikram Patel',
    avatar: 'https://ui-avatars.com/api/?name=Vikram+Patel&background=4facfe&color=fff&size=200',
    role: 'Goalkeeper',
    skillLevel: 'Advanced',
    rating: 4.7,
    location: 'Whitefield',
    distance: '4.2 km',
    matchesPlayed: 56,
    sports: ['Football'],
  },
];

export default function RequestScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'individual' | 'team'>('individual');
  const [hasProfile, setHasProfile] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [dayAvailability, setDayAvailability] = useState<DayAvailability[]>(
    DAYS_OF_WEEK.map(day => ({
      day,
      selected: false,
      fromTime: '',
      toTime: '',
    }))
  );

  const toggleDay = (index: number) => {
    const updated = [...dayAvailability];
    updated[index].selected = !updated[index].selected;
    setDayAvailability(updated);
  };

  const setDayTime = (index: number, type: 'from' | 'to', time: string) => {
    const updated = [...dayAvailability];
    if (type === 'from') {
      updated[index].fromTime = time;
    } else {
      updated[index].toTime = time;
    }
    setDayAvailability(updated);
  };

  const handleSaveProfile = () => {
    if (!selectedRole) {
      Alert.alert('Missing Info', 'Please select your role');
      return;
    }
    const selectedDays = dayAvailability.filter(d => d.selected);
    if (selectedDays.length === 0) {
      Alert.alert('Missing Info', 'Please select at least one day');
      return;
    }
    const incompleteDays = selectedDays.filter(d => !d.fromTime || !d.toTime);
    if (incompleteDays.length > 0) {
      Alert.alert('Missing Info', 'Please set time slots for all selected days');
      return;
    }
    setHasProfile(true);
    Alert.alert('Success! 🎉', 'Your player profile has been created! Teams can now find you.');
  };

  const handleTurfRequest = (turf: TurfRequest) => {
    Alert.alert(
      '🎯 Request Turf Slot',
      `Request to play at ${turf.turfName} on ${turf.date} at ${turf.time}?\n\nPrice: ₹${turf.price}\nSkill Level: ${turf.skillLevel}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Request',
          onPress: () => {
            Alert.alert('Success! 🎉', 'Your turf request has been sent! Players can now find and accept your request.');
          },
        },
      ]
    );
  };

  const handlePlayerRequest = (player: Player) => {
    Alert.alert(
      '👥 Request Player',
      `Send request to ${player.name} to join your team?\n\nRole: ${player.role}\nSkill Level: ${player.skillLevel}\nRating: ${player.rating}/5`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Request',
          onPress: () => {
            Alert.alert('Success! 🎉', `Request sent to ${player.name}! You'll be notified when they respond.`);
          },
        },
      ]
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
            <Text style={styles.headerTitle}>Request Hub 🚀</Text>
            <Text style={styles.headerSubtitle}>Find players or request turfs</Text>
          </View>
          <TouchableOpacity style={styles.helpButton}>
            <Ionicons name="help-circle" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* 3D Segmented Control */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              selectedTab === 'individual' && styles.segmentButtonActive,
            ]}
            onPress={() => setSelectedTab('individual')}
            activeOpacity={0.8}
          >
            {selectedTab === 'individual' && (
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.segmentGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            )}
            <Ionicons
              name="person"
              size={20}
              color={selectedTab === 'individual' ? '#fff' : 'rgba(255,255,255,0.6)'}
              style={{ zIndex: 2 }}
            />
            <Text
              style={[
                styles.segmentText,
                selectedTab === 'individual' && styles.segmentTextActive,
              ]}
            >
              Solo Player
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentButton,
              selectedTab === 'team' && styles.segmentButtonActive,
            ]}
            onPress={() => setSelectedTab('team')}
            activeOpacity={0.8}
          >
            {selectedTab === 'team' && (
              <LinearGradient
                colors={['#FF9800', '#FF5722']}
                style={styles.segmentGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            )}
            <Ionicons
              name="people"
              size={20}
              color={selectedTab === 'team' ? '#fff' : 'rgba(255,255,255,0.6)'}
              style={{ zIndex: 2 }}
            />
            <Text
              style={[
                styles.segmentText,
                selectedTab === 'team' && styles.segmentTextActive,
              ]}
            >
              Team Manager
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content Sections */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {selectedTab === 'individual' ? (
          !hasProfile ? (
            // REGISTRATION FORM FOR SOLO PLAYER
            <View style={styles.section}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.infoCard3D}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.infoCardContent}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="person-add" size={32} color="#fff" />
                  </View>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Create Your Player Profile 🎮</Text>
                    <Text style={styles.infoText}>
                      Set your role and availability so teams can find and request you!
                    </Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Role Selection */}
              <Text style={styles.formLabel}>Select Your Role *</Text>
              <View style={styles.rolesGrid}>
                {PLAYER_ROLES.map((role) => (
                  <TouchableOpacity
                    key={role.id}
                    style={[
                      styles.roleCard3D,
                      selectedRole === role.name && styles.roleCardSelected3D,
                    ]}
                    onPress={() => setSelectedRole(role.name)}
                    activeOpacity={0.8}
                  >
                    {selectedRole === role.name ? (
                      <LinearGradient
                        colors={role.color}
                        style={styles.roleCardGradient}
                      >
                        <Text style={styles.roleIcon}>{role.icon}</Text>
                        <Text style={styles.roleNameSelected}>{role.name}</Text>
                        <View style={styles.checkBadge}>
                          <Ionicons name="checkmark-circle" size={24} color="#fff" />
                        </View>
                      </LinearGradient>
                    ) : (
                      <View style={styles.roleCardPlain}>
                        <Text style={styles.roleIcon}>{role.icon}</Text>
                        <Text style={styles.roleName}>{role.name}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              {/* Day & Time Availability */}
              <Text style={styles.formLabel}>Select Available Days & Time *</Text>
              <Text style={styles.formHint}>Teams will find you based on your availability</Text>

              {dayAvailability.map((dayData, index) => (
                <View key={dayData.day} style={styles.dayCard}>
                  <TouchableOpacity
                    style={styles.dayHeader}
                    onPress={() => toggleDay(index)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.dayHeaderLeft}>
                      <View
                        style={[
                          styles.checkbox,
                          dayData.selected && styles.checkboxSelected,
                        ]}
                      >
                        {dayData.selected && (
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        )}
                      </View>
                      <Text style={styles.dayName}>{dayData.day}</Text>
                    </View>
                    {dayData.selected && (
                      <Text style={styles.dayStatus}>
                        {dayData.fromTime && dayData.toTime
                          ? `${dayData.fromTime} - ${dayData.toTime}`
                          : 'Set time →'}
                      </Text>
                    )}
                  </TouchableOpacity>

                  {dayData.selected && (
                    <View style={styles.timeSelector}>
                      {/* From Time */}
                      <View style={styles.timeColumn}>
                        <Text style={styles.timeLabel}>From</Text>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={styles.timeScroll}
                        >
                          {TIME_SLOTS.map((time) => (
                            <TouchableOpacity
                              key={time + '-from'}
                              style={[
                                styles.timeChip,
                                dayData.fromTime === time && styles.timeChipSelected,
                              ]}
                              onPress={() => setDayTime(index, 'from', time)}
                            >
                              <Text
                                style={[
                                  styles.timeChipText,
                                  dayData.fromTime === time && styles.timeChipTextSelected,
                                ]}
                              >
                                {time}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>

                      {/* To Time */}
                      <View style={styles.timeColumn}>
                        <Text style={styles.timeLabel}>To</Text>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={styles.timeScroll}
                        >
                          {TIME_SLOTS.map((time) => (
                            <TouchableOpacity
                              key={time + '-to'}
                              style={[
                                styles.timeChip,
                                dayData.toTime === time && styles.timeChipSelected,
                              ]}
                              onPress={() => setDayTime(index, 'to', time)}
                            >
                              <Text
                                style={[
                                  styles.timeChipText,
                                  dayData.toTime === time && styles.timeChipTextSelected,
                                ]}
                              >
                                {time}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    </View>
                  )}
                </View>
              ))}

              {/* Save Button */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#4CAF50', '#45a049']}
                  style={styles.saveButtonGradient}
                >
                  <Ionicons name="checkmark-circle" size={24} color="#fff" />
                  <Text style={styles.saveButtonText}>Save Profile & Start Requesting</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={{ height: 30 }} />
            </View>
          ) : (
            // SECTION 1: Individual Player Request (After Registration)
            <View style={styles.section}>
              {/* Profile Summary */}
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                style={styles.profileSummaryCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.profileSummaryHeader}>
                  <View style={styles.profileSummaryLeft}>
                    <Ionicons name="checkmark-circle" size={28} color="#fff" />
                    <View>
                      <Text style={styles.profileSummaryTitle}>Profile Active 🔥</Text>
                      <Text style={styles.profileSummarySubtitle}>Role: {selectedRole}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setHasProfile(false)}
                  >
                    <Ionicons name="create" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>

                <View style={styles.availabilityChips}>
                  {dayAvailability
                    .filter(d => d.selected)
                    .map((d, idx) => (
                      <View key={idx} style={styles.availabilityChip}>
                        <Text style={styles.availabilityChipText}>
                          {d.day}: {d.fromTime} - {d.toTime}
                        </Text>
                      </View>
                    ))}
                </View>
              </LinearGradient>

              {/* Info Card */}
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.infoCard3D}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.infoCardContent}>
                  <View style={styles.infoIcon}>
                    <Ionicons name="information-circle" size={32} color="#fff" />
                  </View>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoTitle}>Looking to Play? 🎮</Text>
                    <Text style={styles.infoText}>
                      Request turf slots below! Teams can see your profile and accept your request.
                    </Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statCard3D}>
                  <LinearGradient
                    colors={['#4CAF50', '#45a049']}
                    style={styles.statGradient}
                  >
                    <Ionicons name="checkmark-circle" size={28} color="#fff" />
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Active</Text>
                  </LinearGradient>
                </View>
                <View style={styles.statCard3D}>
                  <LinearGradient
                    colors={['#2196F3', '#1976D2']}
                    style={styles.statGradient}
                  >
                    <Ionicons name="time" size={28} color="#fff" />
                    <Text style={styles.statNumber}>8</Text>
                    <Text style={styles.statLabel}>Pending</Text>
                  </LinearGradient>
                </View>
                <View style={styles.statCard3D}>
                  <LinearGradient
                    colors={['#FF9800', '#F57C00']}
                    style={styles.statGradient}
                  >
                    <Ionicons name="people" size={28} color="#fff" />
                    <Text style={styles.statNumber}>24</Text>
                    <Text style={styles.statLabel}>Joined</Text>
                  </LinearGradient>
                </View>
              </View>

              <Text style={styles.sectionTitle}>🏟️ Request Turf Slots</Text>

              {/* Turf Cards with 3D Effects */}
              {TURF_REQUESTS.map((turf) => (
                <TouchableOpacity
                  key={turf.id}
                  style={styles.turfCard3D}
                  activeOpacity={0.9}
                  onPress={() => handleTurfRequest(turf)}
                >
                  <View style={styles.turfCardInner}>
                    <Image source={{ uri: turf.turfImage }} style={styles.turfImage} />

                    {/* Floating Badge */}
                    <View style={styles.floatingBadge}>
                      <LinearGradient
                        colors={['#FF6B6B', '#FF8E53']}
                        style={styles.badgeGradient}
                      >
                        <Text style={styles.badgeText}>{turf.availableSlots} slots</Text>
                      </LinearGradient>
                    </View>

                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.95)']}
                      style={styles.turfOverlay}
                    >
                      <View style={styles.turfContent}>
                        <Text style={styles.turfName}>{turf.turfName}</Text>

                        <View style={styles.turfDetails}>
                          <View style={styles.detailItem}>
                            <Ionicons name="calendar" size={14} color="#fff" />
                            <Text style={styles.detailText}>{turf.date}</Text>
                          </View>
                          <View style={styles.detailItem}>
                            <Ionicons name="time" size={14} color="#fff" />
                            <Text style={styles.detailText}>{turf.time}</Text>
                          </View>
                        </View>

                        <View style={styles.turfDetails}>
                          <View style={styles.detailItem}>
                            <Ionicons name="location" size={14} color="#4CAF50" />
                            <Text style={styles.detailText}>{turf.location}</Text>
                            <Text style={styles.distanceText}>• {turf.distance}</Text>
                          </View>
                        </View>

                        <View style={styles.turfFooter}>
                          <LinearGradient
                            colors={['#4CAF50', '#45a049']}
                            style={styles.priceTag3D}
                          >
                            <Text style={styles.priceText}>₹{turf.price}</Text>
                          </LinearGradient>

                          <View style={styles.skillBadge}>
                            <Text style={styles.skillText}>{turf.skillLevel}</Text>
                          </View>

                          <View style={styles.requestIcon}>
                            <Ionicons name="send" size={20} color="#4CAF50" />
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )
        ) : (
          // SECTION 2: Team Manager Request
          <View style={styles.section}>
            {/* Info Card */}
            <LinearGradient
              colors={['#FF9800', '#FF5722']}
              style={styles.infoCard3D}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.infoCardContent}>
                <View style={styles.infoIcon}>
                  <Ionicons name="people-circle" size={32} color="#fff" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoTitle}>Need More Players? 🏆</Text>
                  <Text style={styles.infoText}>
                    Find skilled players nearby and invite them to join your team!
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* Team Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statCard3D}>
                <LinearGradient
                  colors={['#9C27B0', '#7B1FA2']}
                  style={styles.statGradient}
                >
                  <Ionicons name="trophy" size={28} color="#fff" />
                  <Text style={styles.statNumber}>5</Text>
                  <Text style={styles.statLabel}>Teams</Text>
                </LinearGradient>
              </View>
              <View style={styles.statCard3D}>
                <LinearGradient
                  colors={['#00BCD4', '#0097A7']}
                  style={styles.statGradient}
                >
                  <Ionicons name="person-add" size={28} color="#fff" />
                  <Text style={styles.statNumber}>15</Text>
                  <Text style={styles.statLabel}>Requests</Text>
                </LinearGradient>
              </View>
              <View style={styles.statCard3D}>
                <LinearGradient
                  colors={['#FF5722', '#E64A19']}
                  style={styles.statGradient}
                >
                  <Ionicons name="people" size={28} color="#fff" />
                  <Text style={styles.statNumber}>48</Text>
                  <Text style={styles.statLabel}>Members</Text>
                </LinearGradient>
              </View>
            </View>

            <Text style={styles.sectionTitle}>⚡ Available Players Nearby</Text>

            {/* Player Cards with 3D Effects */}
            {AVAILABLE_PLAYERS.map((player, index) => (
              <TouchableOpacity
                key={player.id}
                style={[
                  styles.playerCard3D,
                  { transform: [{ rotateY: `${index % 2 === 0 ? '2deg' : '-2deg'}` }] }
                ]}
                activeOpacity={0.9}
                onPress={() => handlePlayerRequest(player)}
              >
                <LinearGradient
                  colors={['#fff', '#f5f5f5']}
                  style={styles.playerCardInner}
                >
                  {/* Player Avatar with 3D Effect */}
                  <View style={styles.avatarContainer3D}>
                    <Image source={{ uri: player.avatar }} style={styles.playerAvatar} />
                    <View style={styles.ratingBadge3D}>
                      <Ionicons name="star" size={12} color="#FFD700" />
                      <Text style={styles.ratingText}>{player.rating}</Text>
                    </View>
                  </View>

                  <View style={styles.playerInfo}>
                    <Text style={styles.playerName}>{player.name}</Text>

                    <View style={styles.playerBadges}>
                      <LinearGradient
                        colors={['#667eea', '#764ba2']}
                        style={styles.roleBadge3D}
                      >
                        <Text style={styles.roleBadgeText}>{player.role}</Text>
                      </LinearGradient>
                      <View style={styles.skillBadgeSmall}>
                        <Text style={styles.skillBadgeText}>{player.skillLevel}</Text>
                      </View>
                    </View>

                    <View style={styles.playerStats}>
                      <View style={styles.statItem}>
                        <Ionicons name="location" size={14} color="#4CAF50" />
                        <Text style={styles.statItemText}>{player.location}</Text>
                        <Text style={styles.distanceTextSmall}>• {player.distance}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <Ionicons name="game-controller" size={14} color="#FF9800" />
                        <Text style={styles.statItemText}>{player.matchesPlayed} matches</Text>
                      </View>
                    </View>

                    <View style={styles.sportsContainer}>
                      {player.sports.map((sport, idx) => (
                        <View key={idx} style={styles.sportChip}>
                          <Text style={styles.sportChipText}>{sport}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Floating Action Button */}
                  <TouchableOpacity
                    style={styles.floatingActionButton}
                    onPress={() => handlePlayerRequest(player)}
                  >
                    <LinearGradient
                      colors={['#4CAF50', '#45a049']}
                      style={styles.fabGradient}
                    >
                      <Ionicons name="add" size={24} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            ))}
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
  helpButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 3D Segmented Control
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 15,
    padding: 4,
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    position: 'relative',
  },
  segmentButtonActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  segmentGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    zIndex: 2,
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: '700',
  },
  // Content
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  // 3D Info Card
  infoCard3D: {
    borderRadius: 20,
    padding: 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  infoCardContent: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  infoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
  },
  // Registration Form
  formLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    marginTop: 10,
  },
  formHint: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
  },
  rolesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 25,
  },
  roleCard3D: {
    width: '48%',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  roleCardSelected3D: {
    shadowColor: '#4CAF50',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  roleCardGradient: {
    padding: 20,
    alignItems: 'center',
    position: 'relative',
    minHeight: 120,
    justifyContent: 'center',
  },
  roleCardPlain: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: 120,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  roleIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  roleName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  roleNameSelected: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  // Day Cards
  dayCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  dayHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  dayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  dayStatus: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
  },
  timeSelector: {
    padding: 16,
    paddingTop: 0,
    gap: 15,
    backgroundColor: '#f9f9f9',
  },
  timeColumn: {
    gap: 8,
  },
  timeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  timeScroll: {
    flexDirection: 'row',
  },
  timeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  timeChipSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  timeChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  timeChipTextSelected: {
    color: '#fff',
  },
  // Save Button
  saveButton: {
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  // Profile Summary Card
  profileSummaryCard: {
    borderRadius: 20,
    padding: 2,
    marginBottom: 20,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  profileSummaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 18,
    padding: 16,
  },
  profileSummaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileSummarySubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  availabilityChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  availabilityChip: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  availabilityChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard3D: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statGradient: {
    padding: 15,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1a1a1a',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  // 3D Turf Cards
  turfCard3D: {
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
    transform: [{ perspective: 1000 }, { rotateX: '2deg' }],
  },
  turfCardInner: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  turfImage: {
    width: '100%',
    height: 200,
  },
  floatingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  badgeGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  turfOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
  },
  turfContent: {
    padding: 15,
    gap: 8,
  },
  turfName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  turfDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  distanceText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  turfFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  priceTag3D: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  skillBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  skillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  requestIcon: {
    marginLeft: 'auto',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 3D Player Cards
  playerCard3D: {
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  playerCardInner: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 15,
    gap: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  avatarContainer3D: {
    position: 'relative',
  },
  playerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  ratingBadge3D: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 3,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  playerInfo: {
    flex: 1,
    gap: 8,
  },
  playerName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  playerBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  roleBadge3D: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  skillBadgeSmall: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  skillBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4CAF50',
  },
  playerStats: {
    gap: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statItemText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  distanceTextSmall: {
    fontSize: 11,
    color: '#999',
  },
  sportsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  sportChip: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sportChipText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FF9800',
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  fabGradient: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
