import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface Player {
  id: string;
  name: string;
  role: 'Captain' | 'Player';
  position?: string;
  skillLevel?: string;
}

export default function CreateTeamScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [teamName, setTeamName] = useState('');
  const [totalPlayers, setTotalPlayers] = useState(5); // For 5v5
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: '', role: 'Captain' },
  ]);

  const playersNeeded = totalPlayers - players.length;
  const isTeamComplete = players.length === totalPlayers && players.every(p => p.name);

  const handleAddPlayer = () => {
    if (players.length < totalPlayers) {
      setPlayers([
        ...players,
        { id: Date.now().toString(), name: '', role: 'Player' },
      ]);
    }
  };

  const handleRemovePlayer = (id: string) => {
    if (players.length > 1) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const handlePlayerNameChange = (id: string, name: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, name } : p));
  };

  const handleRequestPlayers = () => {
    if (!teamName) {
      Alert.alert('Team Name Required', 'Please enter a team name');
      return;
    }
    router.push({
      pathname: '/request-players',
      params: {
        eventId: params.eventId,
        eventName: params.eventName,
        teamName,
        currentPlayers: players.length,
        totalPlayers,
        sport: params.sport,
      },
    });
  };

  const handleProceed = () => {
    if (!teamName) {
      Alert.alert('Team Name Required', 'Please enter a team name');
      return;
    }
    if (!isTeamComplete) {
      Alert.alert(
        'Incomplete Team',
        'Please add all team members or request players to join',
        [
          { text: 'Request Players', onPress: handleRequestPlayers },
          { text: 'OK', style: 'cancel' },
        ]
      );
      return;
    }
    Alert.alert(
      'Confirm Registration',
      `Register ${teamName} for ${params.eventName}?\nEntry Fee: ₹${params.entryFee}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Team registered successfully!', [
              { text: 'OK', onPress: () => router.push('/(dashboard)/events') },
            ]);
          },
        },
      ]
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
        <Text style={styles.headerTitle}>Create Your Team</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Event Info Card */}
        <View style={styles.eventCard}>
          <MaterialIcons name="event" size={24} color="#4CAF50" />
          <View style={styles.eventInfo}>
            <Text style={styles.eventName}>{params.eventName}</Text>
            <Text style={styles.eventFormat}>{params.sport} • {params.format}</Text>
          </View>
        </View>

        {/* Team Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Name</Text>
          <TextInput
            style={styles.teamNameInput}
            placeholder="Enter your team name"
            value={teamName}
            onChangeText={setTeamName}
            placeholderTextColor="#999"
          />
        </View>

        {/* Team Size Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Size</Text>
          <View style={styles.teamSizeContainer}>
            <TouchableOpacity
              style={styles.sizeButton}
              onPress={() => setTotalPlayers(Math.max(1, totalPlayers - 1))}
            >
              <MaterialIcons name="remove" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <View style={styles.sizeDisplay}>
              <Text style={styles.sizeNumber}>{totalPlayers}</Text>
              <Text style={styles.sizeLabel}>Players</Text>
            </View>
            <TouchableOpacity
              style={styles.sizeButton}
              onPress={() => setTotalPlayers(Math.min(11, totalPlayers + 1))}
            >
              <MaterialIcons name="add" size={24} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          <Text style={styles.sizeHint}>
            Recommended: {params.format === '5v5' ? '5' : '11'} players for {params.format}
          </Text>
        </View>

        {/* Players List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Team Members ({players.length}/{totalPlayers})</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(players.length / totalPlayers) * 100}%` },
                ]}
              />
            </View>
          </View>

          {players.map((player, index) => (
            <View key={player.id} style={styles.playerCard}>
              <View style={styles.playerNumber}>
                <Text style={styles.playerNumberText}>{index + 1}</Text>
              </View>

              <View style={styles.playerInputContainer}>
                {player.role === 'Captain' && (
                  <View style={styles.captainBadge}>
                    <MaterialIcons name="stars" size={14} color="#FFC107" />
                    <Text style={styles.captainText}>Captain</Text>
                  </View>
                )}
                <TextInput
                  style={styles.playerInput}
                  placeholder={player.role === 'Captain' ? 'Your name (Captain)' : 'Player name'}
                  value={player.name}
                  onChangeText={(text) => handlePlayerNameChange(player.id, text)}
                  placeholderTextColor="#999"
                />
              </View>

              {player.role !== 'Captain' && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemovePlayer(player.id)}
                >
                  <MaterialIcons name="close" size={20} color="#F44336" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {/* Add Player Button */}
          {players.length < totalPlayers && (
            <TouchableOpacity style={styles.addPlayerButton} onPress={handleAddPlayer}>
              <MaterialIcons name="add-circle-outline" size={24} color="#4CAF50" />
              <Text style={styles.addPlayerText}>Add Player</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Team Status */}
        {playersNeeded > 0 && (
          <View style={styles.statusCard}>
            <View style={styles.statusIconContainer}>
              <MaterialIcons name="people-outline" size={30} color="#FF9800" />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>Need More Players?</Text>
              <Text style={styles.statusDescription}>
                You need {playersNeeded} more {playersNeeded === 1 ? 'player' : 'players'} to complete your team
              </Text>
              <TouchableOpacity
                style={styles.requestPlayersButton}
                onPress={handleRequestPlayers}
              >
                <Ionicons name="people" size={18} color="#fff" />
                <Text style={styles.requestPlayersText}>Request Players</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Team Complete */}
        {isTeamComplete && (
          <View style={[styles.statusCard, styles.completeCard]}>
            <View style={[styles.statusIconContainer, { backgroundColor: '#E8F5E9' }]}>
              <MaterialIcons name="check-circle" size={30} color="#4CAF50" />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>Team Complete!</Text>
              <Text style={styles.statusDescription}>
                Your team is ready to register for the event
              </Text>
            </View>
          </View>
        )}

        {/* Team Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Registration Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Team Name</Text>
            <Text style={styles.summaryValue}>{teamName || 'Not Set'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Players</Text>
            <Text style={styles.summaryValue}>{players.length}/{totalPlayers}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Entry Fee</Text>
            <Text style={styles.summaryValue}>₹{params.entryFee}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{params.entryFee}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.proceedButton, !teamName && styles.proceedButtonDisabled]}
          onPress={handleProceed}
          disabled={!teamName}
        >
          <Text style={styles.proceedButtonText}>
            {isTeamComplete ? 'Register Team' : 'Save & Continue Later'}
          </Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    gap: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  eventFormat: {
    fontSize: 13,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  teamNameInput: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  teamSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  sizeButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeDisplay: {
    alignItems: 'center',
  },
  sizeNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sizeLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  sizeHint: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginTop: 15,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 12,
  },
  playerNumber: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerInputContainer: {
    flex: 1,
  },
  captainBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginBottom: 5,
    gap: 3,
  },
  captainText: {
    fontSize: 11,
    color: '#FF9800',
    fontWeight: '600',
  },
  playerInput: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 15,
    color: '#333',
  },
  removeButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPlayerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
    borderRadius: 12,
    gap: 8,
  },
  addPlayerText: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '600',
  },
  statusCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    gap: 15,
  },
  completeCard: {
    backgroundColor: '#E8F5E9',
  },
  statusIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF3E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  statusDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
    lineHeight: 18,
  },
  requestPlayersButton: {
    flexDirection: 'row',
    backgroundColor: '#FF9800',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
  },
  requestPlayersText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  proceedButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  proceedButtonDisabled: {
    backgroundColor: '#ccc',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});