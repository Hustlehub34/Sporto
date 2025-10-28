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
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface Turf {
  id: string;
  name: string;
  location: string;
  sport: string;
}

const MY_TURFS: Turf[] = [
  { id: '1', name: 'Green Valley Cricket Turf', location: 'Koramangala', sport: 'Cricket' },
  { id: '2', name: 'Champions Cricket Ground', location: 'HSR Layout', sport: 'Cricket' },
  { id: '3', name: 'Sports Arena', location: 'Indiranagar', sport: 'Cricket' },
  { id: '4', name: 'Pro Cricket Club', location: 'Whitefield', sport: 'Cricket' },
];

export default function AddEventScreen() {
  const router = useRouter();

  // Form State
  const [eventTitle, setEventTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTurf, setSelectedTurf] = useState<Turf | null>(null);
  const [showTurfPicker, setShowTurfPicker] = useState(false);

  // Date & Time
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  // Sport Type
  const [sports] = useState([
    { id: '1', name: 'Cricket', icon: 'sports-cricket' },
    { id: '2', name: 'Football', icon: 'sports-soccer' },
    { id: '3', name: 'Badminton', icon: 'sports-tennis' },
    { id: '4', name: 'Basketball', icon: 'sports-basketball' },
  ]);
  const [selectedSport, setSelectedSport] = useState('');

  // Players
  const [totalPlayers, setTotalPlayers] = useState('');
  const [pricePerPlayer, setPricePerPlayer] = useState('');

  // Skill Level
  const [skillLevels] = useState(['Beginner', 'Intermediate', 'Advanced', 'Professional']);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('');

  // Event Type
  const [eventTypes] = useState([
    { id: '1', name: 'Practice Session', icon: 'fitness-center' },
    { id: '2', name: 'Friendly Match', icon: 'emoji-events' },
    { id: '3', name: 'Tournament', icon: 'military-tech' },
    { id: '4', name: 'Training Camp', icon: 'school' },
  ]);
  const [selectedEventType, setSelectedEventType] = useState('');

  // Additional Options
  const [isPublic, setIsPublic] = useState(true);
  const [allowPlayerRequests, setAllowPlayerRequests] = useState(true);

  // Roles Needed
  const [rolesNeeded, setRolesNeeded] = useState([
    { id: '1', name: 'Batsman', selected: false },
    { id: '2', name: 'Bowler', selected: false },
    { id: '3', name: 'All-Rounder', selected: false },
    { id: '4', name: 'Wicket Keeper', selected: false },
  ]);

  const toggleRole = (id: string) => {
    setRolesNeeded(rolesNeeded.map(role =>
      role.id === id ? { ...role, selected: !role.selected } : role
    ));
  };

  const handleSubmit = () => {
    if (!eventTitle || !selectedTurf || !date || !startTime || !endTime || !selectedSport || !totalPlayers || !pricePerPlayer) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      'Your event has been created successfully!',
      [{ text: 'OK', onPress: () => router.back() }]
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
        <Text style={styles.headerTitle}>Create Event</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Event Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Title <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Weekend Cricket Match"
              value={eventTitle}
              onChangeText={setEventTitle}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your event, rules, and what to expect..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Select Turf */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Turf <Text style={styles.required}>*</Text></Text>

          {selectedTurf ? (
            <TouchableOpacity
              style={styles.selectedTurfCard}
              onPress={() => setShowTurfPicker(!showTurfPicker)}
            >
              <View style={styles.turfIcon}>
                <MaterialIcons name="business" size={24} color="#4CAF50" />
              </View>
              <View style={styles.turfInfo}>
                <Text style={styles.turfName}>{selectedTurf.name}</Text>
                <Text style={styles.turfLocation}>{selectedTurf.location}</Text>
              </View>
              <MaterialIcons name="edit" size={20} color="#666" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.selectTurfButton}
              onPress={() => setShowTurfPicker(!showTurfPicker)}
            >
              <MaterialIcons name="add-business" size={24} color="#4CAF50" />
              <Text style={styles.selectTurfText}>Select a Turf</Text>
            </TouchableOpacity>
          )}

          {showTurfPicker && (
            <View style={styles.turfPicker}>
              {MY_TURFS.map((turf) => (
                <TouchableOpacity
                  key={turf.id}
                  style={styles.turfOption}
                  onPress={() => {
                    setSelectedTurf(turf);
                    setShowTurfPicker(false);
                  }}
                >
                  <View style={styles.turfIcon}>
                    <MaterialIcons name="business" size={20} color="#4CAF50" />
                  </View>
                  <View style={styles.turfInfo}>
                    <Text style={styles.turfOptionName}>{turf.name}</Text>
                    <Text style={styles.turfOptionLocation}>{turf.location}</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={20} color="#ccc" />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Date & Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time <Text style={styles.required}>*</Text></Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.dateButton}>
              <Ionicons name="calendar" size={20} color="#4CAF50" />
              <Text style={styles.dateText}>{date || 'Select Date'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.timeRow}>
            <View style={styles.timeInput}>
              <Text style={styles.label}>Start Time</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Ionicons name="time" size={20} color="#4CAF50" />
                <Text style={styles.timeText}>{startTime || '00:00'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.timeInput}>
              <Text style={styles.label}>End Time</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Ionicons name="time" size={20} color="#4CAF50" />
                <Text style={styles.timeText}>{endTime || '00:00'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sport Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sport <Text style={styles.required}>*</Text></Text>
          <View style={styles.sportsGrid}>
            {sports.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                style={[
                  styles.sportCard,
                  selectedSport === sport.name && styles.sportCardSelected,
                ]}
                onPress={() => setSelectedSport(sport.name)}
              >
                <MaterialIcons
                  name={sport.icon as any}
                  size={28}
                  color={selectedSport === sport.name ? '#4CAF50' : '#999'}
                />
                <Text
                  style={[
                    styles.sportName,
                    selectedSport === sport.name && styles.sportNameSelected,
                  ]}
                >
                  {sport.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Event Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Type</Text>
          <View style={styles.eventTypesGrid}>
            {eventTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.eventTypeCard,
                  selectedEventType === type.name && styles.eventTypeCardSelected,
                ]}
                onPress={() => setSelectedEventType(type.name)}
              >
                <MaterialIcons
                  name={type.icon as any}
                  size={24}
                  color={selectedEventType === type.name ? '#4CAF50' : '#666'}
                />
                <Text
                  style={[
                    styles.eventTypeText,
                    selectedEventType === type.name && styles.eventTypeTextSelected,
                  ]}
                >
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Players & Pricing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Players & Pricing</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Players Needed <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 11"
              value={totalPlayers}
              onChangeText={setTotalPlayers}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price Per Player <Text style={styles.required}>*</Text></Text>
            <View style={styles.priceInput}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.priceTextInput}
                placeholder="0"
                value={pricePerPlayer}
                onChangeText={setPricePerPlayer}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>

        {/* Skill Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skill Level Required</Text>
          <View style={styles.skillLevelsGrid}>
            {skillLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.skillLevelChip,
                  selectedSkillLevel === level && styles.skillLevelChipSelected,
                ]}
                onPress={() => setSelectedSkillLevel(level)}
              >
                <Text
                  style={[
                    styles.skillLevelText,
                    selectedSkillLevel === level && styles.skillLevelTextSelected,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Roles Needed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Roles Needed (For Cricket)</Text>
          <View style={styles.rolesGrid}>
            {rolesNeeded.map((role) => (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleChip,
                  role.selected && styles.roleChipSelected,
                ]}
                onPress={() => toggleRole(role.id)}
              >
                <Text
                  style={[
                    styles.roleText,
                    role.selected && styles.roleTextSelected,
                  ]}
                >
                  {role.name}
                </Text>
                {role.selected && (
                  <MaterialIcons name="check" size={16} color="#4CAF50" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Options</Text>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setIsPublic(!isPublic)}
          >
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Public Event</Text>
              <Text style={styles.optionDescription}>
                Anyone can view and join this event
              </Text>
            </View>
            <View style={[styles.toggle, isPublic && styles.toggleActive]}>
              {isPublic && <View style={styles.toggleThumb} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setAllowPlayerRequests(!allowPlayerRequests)}
          >
            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>Allow Player Requests</Text>
              <Text style={styles.optionDescription}>
                Players can request to join this event
              </Text>
            </View>
            <View style={[styles.toggle, allowPlayerRequests && styles.toggleActive]}>
              {allowPlayerRequests && <View style={styles.toggleThumb} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Event Title:</Text>
              <Text style={styles.summaryValue}>{eventTitle || '-'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Turf:</Text>
              <Text style={styles.summaryValue}>{selectedTurf?.name || '-'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date:</Text>
              <Text style={styles.summaryValue}>{date || '-'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time:</Text>
              <Text style={styles.summaryValue}>
                {startTime && endTime ? `${startTime} - ${endTime}` : '-'}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Players:</Text>
              <Text style={styles.summaryValue}>{totalPlayers || '-'}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Price/Player:</Text>
              <Text style={styles.summaryValue}>
                {pricePerPlayer ? `₹${pricePerPlayer}` : '-'}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <MaterialIcons name="event" size={22} color="#fff" />
          <Text style={styles.submitButtonText}>Create Event</Text>
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
  section: {
    backgroundColor: '#fff',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#F44336',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  selectTurfButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
    gap: 10,
  },
  selectTurfText: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '600',
  },
  selectedTurfCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  turfIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  turfInfo: {
    flex: 1,
  },
  turfName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  turfLocation: {
    fontSize: 13,
    color: '#666',
  },
  turfPicker: {
    marginTop: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 10,
  },
  turfOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  turfOptionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  turfOptionLocation: {
    fontSize: 12,
    color: '#666',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 15,
  },
  timeInput: {
    flex: 1,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  timeText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sportCard: {
    width: '47%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sportCardSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  sportName: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
  sportNameSelected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  eventTypesGrid: {
    gap: 10,
  },
  eventTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  eventTypeCardSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  eventTypeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  eventTypeTextSelected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 8,
  },
  priceTextInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },
  skillLevelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillLevelChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  skillLevelChipSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  skillLevelText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  skillLevelTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  rolesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  roleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 6,
  },
  roleChipSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  roleText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  roleTextSelected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  optionInfo: {
    flex: 1,
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    color: '#666',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: '#4CAF50',
    alignItems: 'flex-end',
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
  summaryCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
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
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
