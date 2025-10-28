import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface Player {
  id: string;
  name: string;
  position: string;
  skillLevel: string;
  rating: number;
  matchesPlayed: number;
  winRate: number;
  avatar: string;
  skills: {
    batting?: number;
    bowling?: number;
    fielding?: number;
    shooting?: number;
    passing?: number;
    defense?: number;
  };
  location: string;
  availability: 'Available' | 'Busy' | 'Maybe';
  isVerified: boolean;
}

const PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    position: 'All-Rounder',
    skillLevel: 'Advanced',
    rating: 4.8,
    matchesPlayed: 145,
    winRate: 68,
    avatar: 'https://via.placeholder.com/80/4CAF50/ffffff?text=RS',
    skills: {
      batting: 85,
      bowling: 78,
      fielding: 90,
    },
    location: 'Koramangala, Bangalore',
    availability: 'Available',
    isVerified: true,
  },
  {
    id: '2',
    name: 'Priya Patel',
    position: 'Batsman',
    skillLevel: 'Professional',
    rating: 4.9,
    matchesPlayed: 203,
    winRate: 75,
    avatar: 'https://via.placeholder.com/80/FF9800/ffffff?text=PP',
    skills: {
      batting: 95,
      bowling: 45,
      fielding: 82,
    },
    location: 'HSR Layout, Bangalore',
    availability: 'Available',
    isVerified: true,
  },
  {
    id: '3',
    name: 'Amit Kumar',
    position: 'Bowler',
    skillLevel: 'Intermediate',
    rating: 4.5,
    matchesPlayed: 87,
    winRate: 62,
    avatar: 'https://via.placeholder.com/80/2196F3/ffffff?text=AK',
    skills: {
      batting: 60,
      bowling: 88,
      fielding: 75,
    },
    location: 'Indiranagar, Bangalore',
    availability: 'Maybe',
    isVerified: false,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    position: 'All-Rounder',
    skillLevel: 'Advanced',
    rating: 4.7,
    matchesPlayed: 156,
    winRate: 70,
    avatar: 'https://via.placeholder.com/80/9C27B0/ffffff?text=SR',
    skills: {
      batting: 80,
      bowling: 75,
      fielding: 85,
    },
    location: 'Whitefield, Bangalore',
    availability: 'Available',
    isVerified: true,
  },
  {
    id: '5',
    name: 'Vijay Singh',
    position: 'Wicket Keeper',
    skillLevel: 'Professional',
    rating: 4.6,
    matchesPlayed: 178,
    winRate: 65,
    avatar: 'https://via.placeholder.com/80/F44336/ffffff?text=VS',
    skills: {
      batting: 75,
      bowling: 30,
      fielding: 95,
    },
    location: 'Koramangala, Bangalore',
    availability: 'Busy',
    isVerified: true,
  },
];

export default function RequestPlayersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const playersNeeded = parseInt(params.totalPlayers as string) - parseInt(params.currentPlayers as string);

  const positions = ['All-Rounder', 'Batsman', 'Bowler', 'Wicket Keeper'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Professional'];

  const filteredPlayers = PLAYERS.filter(player => {
    const matchesPosition = !selectedPosition || player.position === selectedPosition;
    const matchesSkillLevel = !selectedSkillLevel || player.skillLevel === selectedSkillLevel;
    const matchesSearch = !searchQuery ||
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPosition && matchesSkillLevel && matchesSearch;
  });

  const handleSelectPlayer = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else {
      if (selectedPlayers.length < playersNeeded) {
        setSelectedPlayers([...selectedPlayers, playerId]);
      } else {
        Alert.alert('Limit Reached', `You can only select ${playersNeeded} players`);
      }
    }
  };

  const handleSendRequests = () => {
    if (selectedPlayers.length === 0) {
      Alert.alert('No Players Selected', 'Please select at least one player');
      return;
    }
    Alert.alert(
      'Send Requests',
      `Send join requests to ${selectedPlayers.length} player(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send',
          onPress: () => {
            Alert.alert('Success', 'Requests sent successfully!', [
              { text: 'OK', onPress: () => router.back() },
            ]);
          },
        },
      ]
    );
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return '#4CAF50';
      case 'Busy': return '#F44336';
      case 'Maybe': return '#FF9800';
      default: return '#999';
    }
  };

  const renderPlayerCard = (player: Player) => {
    const isSelected = selectedPlayers.includes(player.id);

    return (
      <TouchableOpacity
        key={player.id}
        style={[styles.playerCard, isSelected && styles.playerCardSelected]}
        onPress={() => handleSelectPlayer(player.id)}
        activeOpacity={0.7}
      >
        {/* Selection Indicator */}
        <View style={styles.selectionIndicator}>
          {isSelected && (
            <View style={styles.checkCircle}>
              <MaterialIcons name="check" size={16} color="#fff" />
            </View>
          )}
        </View>

        {/* Player Avatar */}
        <Image source={{ uri: player.avatar }} style={styles.avatar} />

        {/* Player Info */}
        <View style={styles.playerInfo}>
          <View style={styles.playerHeader}>
            <Text style={styles.playerName}>{player.name}</Text>
            {player.isVerified && (
              <MaterialIcons name="verified" size={16} color="#4CAF50" />
            )}
          </View>

          <View style={styles.positionRow}>
            <View style={styles.positionBadge}>
              <Text style={styles.positionText}>{player.position}</Text>
            </View>
            <View style={[styles.skillBadge, { backgroundColor: `${getAvailabilityColor(player.availability)}20` }]}>
              <View style={[styles.statusDot, { backgroundColor: getAvailabilityColor(player.availability) }]} />
              <Text style={[styles.skillText, { color: getAvailabilityColor(player.availability) }]}>
                {player.availability}
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <MaterialIcons name="star" size={14} color="#FFC107" />
              <Text style={styles.statText}>{player.rating}</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="sports-cricket" size={14} color="#666" />
              <Text style={styles.statText}>{player.matchesPlayed} matches</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="trending-up" size={14} color="#4CAF50" />
              <Text style={styles.statText}>{player.winRate}% wins</Text>
            </View>
          </View>

          {/* Skills Bar */}
          <View style={styles.skillsContainer}>
            {Object.entries(player.skills).map(([skill, value]) => (
              <View key={skill} style={styles.skillRow}>
                <Text style={styles.skillName}>{skill.charAt(0).toUpperCase() + skill.slice(1)}</Text>
                <View style={styles.skillBar}>
                  <View style={[styles.skillFill, { width: `${value}%` }]} />
                </View>
                <Text style={styles.skillValue}>{value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={14} color="#999" />
            <Text style={styles.locationText}>{player.location}</Text>
          </View>
        </View>

        {/* Request Button */}
        <TouchableOpacity
          style={[styles.requestButton, isSelected && styles.requestButtonSelected]}
          onPress={() => handleSelectPlayer(player.id)}
        >
          <Text style={[styles.requestButtonText, isSelected && styles.requestButtonTextSelected]}>
            {isSelected ? 'Selected' : 'Select'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Players</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Players Needed Banner */}
      <View style={styles.needBanner}>
        <Ionicons name="people" size={24} color="#FF9800" />
        <View style={styles.needInfo}>
          <Text style={styles.needText}>Players Needed: {playersNeeded}</Text>
          <Text style={styles.needSubtext}>Selected: {selectedPlayers.length}/{playersNeeded}</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search players by name or position..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        <Text style={styles.filterLabel}>Position:</Text>
        <TouchableOpacity
          style={[styles.filterChip, !selectedPosition && styles.filterChipActive]}
          onPress={() => setSelectedPosition(null)}
        >
          <Text style={[styles.filterChipText, !selectedPosition && styles.filterChipTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        {positions.map((position) => (
          <TouchableOpacity
            key={position}
            style={[styles.filterChip, selectedPosition === position && styles.filterChipActive]}
            onPress={() => setSelectedPosition(position)}
          >
            <Text style={[styles.filterChipText, selectedPosition === position && styles.filterChipTextActive]}>
              {position}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        <Text style={styles.filterLabel}>Skill:</Text>
        <TouchableOpacity
          style={[styles.filterChip, !selectedSkillLevel && styles.filterChipActive]}
          onPress={() => setSelectedSkillLevel(null)}
        >
          <Text style={[styles.filterChipText, !selectedSkillLevel && styles.filterChipTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        {skillLevels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.filterChip, selectedSkillLevel === level && styles.filterChipActive]}
            onPress={() => setSelectedSkillLevel(level)}
          >
            <Text style={[styles.filterChipText, selectedSkillLevel === level && styles.filterChipTextActive]}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Players List */}
      <ScrollView style={styles.playersList} showsVerticalScrollIndicator={false}>
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(renderPlayerCard)
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="people-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>No Players Found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
          </View>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      {selectedPlayers.length > 0 && (
        <View style={styles.bottomBar}>
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedCount}>{selectedPlayers.length} Selected</Text>
            <Text style={styles.selectedSubtext}>
              {playersNeeded - selectedPlayers.length} more needed
            </Text>
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendRequests}>
            <Ionicons name="send" size={18} color="#fff" />
            <Text style={styles.sendButtonText}>Send Requests</Text>
          </TouchableOpacity>
        </View>
      )}
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
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  needBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 12,
  },
  needInfo: {
    flex: 1,
  },
  needText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF9800',
  },
  needSubtext: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  filterLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    alignSelf: 'center',
    marginRight: 10,
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
  playersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  playerCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    position: 'relative',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  playerCardSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  selectionIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
  },
  playerInfo: {
    flex: 1,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  positionRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  positionBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  positionText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
  },
  skillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  skillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  skillsContainer: {
    marginBottom: 12,
    gap: 8,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  skillName: {
    fontSize: 12,
    color: '#666',
    width: 60,
  },
  skillBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  skillFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  skillValue: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
    width: 25,
    textAlign: 'right',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#999',
  },
  requestButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  requestButtonSelected: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  requestButtonTextSelected: {
    color: '#4CAF50',
  },
  emptyContainer: {
    alignItems: 'center',
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
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedInfo: {
    flex: 1,
  },
  selectedCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedSubtext: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  sendButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    gap: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});