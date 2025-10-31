import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

interface Team {
  id: string;
  teamName: string;
  captainName: string;
  captainContact: string;
  sport: 'Football' | 'Cricket';
  format: string;
  players: string[];
  turf: string;
  location: string;
  availableFrom: string;
  availableTo: string;
  availableDate: string;
  createdAt: string;
}

interface Turf {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string;
  distance: string;
  sport: string;
}

const SAMPLE_TURFS: Turf[] = [
  { id: '1', name: 'Green Valley Cricket Ground', location: 'Koramangala', rating: 4.8, price: '₹1200', image: '', distance: '2.5 km', sport: 'Cricket' },
  { id: '2', name: 'Champions Football Arena', location: 'HSR Layout', rating: 4.9, price: '₹1500', image: '', distance: '3.2 km', sport: 'Football' },
  { id: '3', name: 'Sports Hub Premium', location: 'Whitefield', rating: 4.7, price: '₹1000', image: '', distance: '5.1 km', sport: 'Multi-Sport' },
  { id: '4', name: 'Victory Sports Complex', location: 'Indiranagar', rating: 4.5, price: '₹800', image: '', distance: '1.2 km', sport: 'Football' },
  { id: '5', name: 'Elite Cricket Ground', location: 'Koramangala', rating: 4.6, price: '₹900', image: '', distance: '1.8 km', sport: 'Cricket' },
];

const CHALLENGE_TEAMS: Team[] = [
  {
    id: '1',
    teamName: 'Thunder Strikers',
    captainName: 'Rajesh Kumar',
    captainContact: '+91 98765 43210',
    sport: 'Cricket',
    format: '11v11',
    players: ['Amit', 'Vikas', 'Suresh', 'Praveen', 'Dinesh', 'Rakesh', 'Mahesh', 'Ramesh', 'Lokesh', 'Ganesh', 'Nitesh'],
    turf: 'Green Valley Cricket Ground',
    location: 'Koramangala',
    availableFrom: '6:00 PM',
    availableTo: '9:00 PM',
    availableDate: 'Sat, Dec 21',
    createdAt: '2 hours ago',
  },
  {
    id: '2',
    teamName: 'FC Warriors',
    captainName: 'Amit Singh',
    captainContact: '+91 98123 45678',
    sport: 'Football',
    format: '5v5',
    players: ['Rohit', 'Virat', 'Dhoni', 'Hardik', 'Jadeja'],
    turf: 'Champions Football Arena',
    location: 'HSR Layout',
    availableFrom: '5:00 PM',
    availableTo: '8:00 PM',
    availableDate: 'Sun, Dec 22',
    createdAt: '5 hours ago',
  },
];

export default function ChallengeScreen() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'main' | 'create' | 'browse'>('main');
  const [selectedTeamSport, setSelectedTeamSport] = useState<'Football' | 'Cricket'>('Football');
  const [selectedFormat, setSelectedFormat] = useState('5v5');
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainContact, setCaptainContact] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [selectedTurf, setSelectedTurf] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [availableFromHour, setAvailableFromHour] = useState('6');
  const [availableFromMin, setAvailableFromMin] = useState('00');
  const [availableFromPeriod, setAvailableFromPeriod] = useState<'AM' | 'PM'>('PM');
  const [availableToHour, setAvailableToHour] = useState('9');
  const [availableToMin, setAvailableToMin] = useState('00');
  const [availableToPeriod, setAvailableToPeriod] = useState<'AM' | 'PM'>('PM');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [teams, setTeams] = useState<Team[]>(CHALLENGE_TEAMS);
  const [myTeam, setMyTeam] = useState<Team | null>(null);
  const [showTurfDropdown, setShowTurfDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getRequiredPlayersCount = () => {
    if (selectedTeamSport === 'Football') {
      return selectedFormat === '5v5' ? 5 : 10;
    } else {
      return 11;
    }
  };

  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = date.getDate();
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      days.push({
        date,
        dayName,
        dayNum,
        month,
        isWeekend,
        isToday: i === 0,
      });
    }

    return days;
  };

  const handleSaveTeam = () => {
    if (!teamName || !captainName || !captainContact || !selectedTurf || !selectedLocation || !selectedDate) {
      alert('Please fill all required fields');
      return;
    }

    const requiredPlayers = getRequiredPlayersCount();
    if (players.filter(p => p.trim() !== '').length !== requiredPlayers) {
      alert(`Please add exactly ${requiredPlayers} player names`);
      return;
    }

    const fromTime = `${availableFromHour}:${availableFromMin} ${availableFromPeriod}`;
    const toTime = `${availableToHour}:${availableToMin} ${availableToPeriod}`;

    const dateStr = selectedDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newTeam: Team = {
      id: Date.now().toString(),
      teamName,
      captainName,
      captainContact,
      sport: selectedTeamSport,
      format: selectedFormat,
      players: players.filter(p => p.trim() !== ''),
      turf: selectedTurf,
      location: selectedLocation,
      availableFrom: fromTime,
      availableTo: toTime,
      availableDate: dateStr,
      createdAt: 'Just now',
    };

    setTeams([newTeam, ...teams]);
    setMyTeam(newTeam);
    alert('Team Created Successfully! 🎉\n\nYour team is now ready for challenges.');

    // Reset form
    setTeamName('');
    setCaptainName('');
    setCaptainContact('');
    setPlayers([]);
    setSelectedTurf('');
    setSelectedLocation('');
    setSelectedDate(null);
    setCurrentView('browse');
  };

  const handleChallengeTeam = (team: Team) => {
    alert(`Challenge Request Sent! 🎯\n\nYou've sent a challenge request to ${team.teamName}.\nCaptain: ${team.captainName}\nContact: ${team.captainContact}\n\nWaiting for their response...`);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {currentView === 'main' ? 'Team Challenge' :
           currentView === 'create' ? 'Create Team' : 'Challenge Teams'}
        </Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      {/* Main View */}
      {currentView === 'main' && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => setCurrentView('create')}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.optionGradient}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name="add-circle" size={48} color="#FFF" />
                </View>
                <Text style={styles.optionTitle}>Create Team</Text>
                <Text style={styles.optionSubtitle}>Build your squad and set availability</Text>
                <Ionicons name="arrow-forward-circle" size={24} color="rgba(255,255,255,0.8)" style={styles.optionArrow} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, !myTeam && styles.optionDisabled]}
              onPress={() => {
                if (myTeam) {
                  setCurrentView('browse');
                } else {
                  alert('Create a team first!\n\nYou need to create your own team before challenging others.');
                }
              }}
              activeOpacity={myTeam ? 0.9 : 0.6}
            >
              <LinearGradient
                colors={myTeam ? ['#f093fb', '#f5576c'] : ['#999', '#666']}
                style={styles.optionGradient}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name="trophy" size={48} color="#FFF" />
                </View>
                <Text style={styles.optionTitle}>Challenge Teams</Text>
                <Text style={styles.optionSubtitle}>
                  {myTeam ? `${teams.length} teams available` : 'Create team first'}
                </Text>
                <Ionicons name="arrow-forward-circle" size={24} color="rgba(255,255,255,0.8)" style={styles.optionArrow} />
              </LinearGradient>
            </TouchableOpacity>

            {myTeam && (
              <View style={styles.myTeamCard}>
                <LinearGradient
                  colors={['#4CAF50', '#45a049']}
                  style={styles.myTeamGradient}
                >
                  <View style={styles.myTeamHeader}>
                    <Text style={styles.myTeamLabel}>Your Active Team</Text>
                    <TouchableOpacity>
                      <Ionicons name="settings" size={20} color="rgba(255,255,255,0.9)" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.myTeamName}>{myTeam.teamName}</Text>
                  <View style={styles.myTeamDetails}>
                    <View style={styles.myTeamBadge}>
                      <Ionicons name="football" size={14} color="#FFF" />
                      <Text style={styles.myTeamBadgeText}>{myTeam.sport}</Text>
                    </View>
                    <View style={styles.myTeamBadge}>
                      <Ionicons name="people" size={14} color="#FFF" />
                      <Text style={styles.myTeamBadgeText}>{myTeam.format}</Text>
                    </View>
                    <View style={styles.myTeamBadge}>
                      <Ionicons name="calendar" size={14} color="#FFF" />
                      <Text style={styles.myTeamBadgeText}>{myTeam.availableDate}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* Create Team View */}
      {currentView === 'create' && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <TouchableOpacity
              style={styles.backLink}
              onPress={() => setCurrentView('main')}
            >
              <Ionicons name="arrow-back" size={20} color="#667eea" />
              <Text style={styles.backLinkText}>Back to options</Text>
            </TouchableOpacity>

            {/* Sport Selection */}
            <Text style={styles.formLabel}>Select Sport</Text>
            <View style={styles.sportSelection}>
              <TouchableOpacity
                style={[
                  styles.sportOption,
                  selectedTeamSport === 'Football' && styles.sportOptionActive,
                ]}
                onPress={() => {
                  setSelectedTeamSport('Football');
                  setSelectedFormat('5v5');
                  setPlayers([]);
                }}
              >
                <LinearGradient
                  colors={
                    selectedTeamSport === 'Football'
                      ? ['#667eea', '#764ba2']
                      : ['#f5f5f5', '#e8e8e8']
                  }
                  style={styles.sportOptionGradient}
                >
                  <Ionicons
                    name="football"
                    size={32}
                    color={selectedTeamSport === 'Football' ? '#FFF' : '#666'}
                  />
                  <Text
                    style={[
                      styles.sportOptionText,
                      selectedTeamSport === 'Football' && styles.sportOptionTextActive,
                    ]}
                  >
                    Football
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.sportOption,
                  selectedTeamSport === 'Cricket' && styles.sportOptionActive,
                ]}
                onPress={() => {
                  setSelectedTeamSport('Cricket');
                  setSelectedFormat('11v11');
                  setPlayers([]);
                }}
              >
                <LinearGradient
                  colors={
                    selectedTeamSport === 'Cricket'
                      ? ['#667eea', '#764ba2']
                      : ['#f5f5f5', '#e8e8e8']
                  }
                  style={styles.sportOptionGradient}
                >
                  <Ionicons
                    name="fitness"
                    size={32}
                    color={selectedTeamSport === 'Cricket' ? '#FFF' : '#666'}
                  />
                  <Text
                    style={[
                      styles.sportOptionText,
                      selectedTeamSport === 'Cricket' && styles.sportOptionTextActive,
                    ]}
                  >
                    Cricket
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Format Selection */}
            <Text style={styles.formLabel}>Team Format</Text>
            <View style={styles.formatSelection}>
              {selectedTeamSport === 'Football' ? (
                <>
                  <TouchableOpacity
                    style={[
                      styles.formatOption,
                      selectedFormat === '5v5' && styles.formatOptionActive,
                    ]}
                    onPress={() => {
                      setSelectedFormat('5v5');
                      setPlayers([]);
                    }}
                  >
                    <Text
                      style={[
                        styles.formatOptionText,
                        selectedFormat === '5v5' && styles.formatOptionTextActive,
                      ]}
                    >
                      5v5
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.formatOption,
                      selectedFormat === '10v10' && styles.formatOptionActive,
                    ]}
                    onPress={() => {
                      setSelectedFormat('10v10');
                      setPlayers([]);
                    }}
                  >
                    <Text
                      style={[
                        styles.formatOptionText,
                        selectedFormat === '10v10' && styles.formatOptionTextActive,
                      ]}
                    >
                      10v10
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={[styles.formatOption, styles.formatOptionActive]}>
                  <Text style={[styles.formatOptionText, styles.formatOptionTextActive]}>
                    11v11 (Standard)
                  </Text>
                </View>
              )}
            </View>

            {/* Team Details */}
            <Text style={styles.formLabel}>Team Name</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter team name"
              placeholderTextColor="#999"
              value={teamName}
              onChangeText={setTeamName}
            />

            <Text style={styles.formLabel}>Captain Name</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter captain name"
              placeholderTextColor="#999"
              value={captainName}
              onChangeText={setCaptainName}
            />

            <Text style={styles.formLabel}>Captain Contact</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter contact number"
              placeholderTextColor="#999"
              value={captainContact}
              onChangeText={setCaptainContact}
              keyboardType="phone-pad"
            />

            {/* Players */}
            <Text style={styles.formLabel}>
              Players ({getRequiredPlayersCount()} required)
            </Text>
            {Array.from({ length: getRequiredPlayersCount() }).map((_, index) => (
              <TextInput
                key={index}
                style={styles.formInput}
                placeholder={`Player ${index + 1} name`}
                placeholderTextColor="#999"
                value={players[index] || ''}
                onChangeText={(text) => {
                  const newPlayers = [...players];
                  newPlayers[index] = text;
                  setPlayers(newPlayers);
                }}
              />
            ))}

            {/* Turf Selection */}
            <Text style={styles.formLabel}>Select Turf</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowTurfDropdown(!showTurfDropdown)}
            >
              <Text style={[styles.dropdownButtonText, !selectedTurf && styles.placeholderText]}>
                {selectedTurf || 'Select a turf'}
              </Text>
              <Ionicons
                name={showTurfDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>

            {showTurfDropdown && (
              <View style={styles.dropdownList}>
                {SAMPLE_TURFS.map((turf) => (
                  <TouchableOpacity
                    key={turf.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedTurf(turf.name);
                      setSelectedLocation(turf.location);
                      setShowTurfDropdown(false);
                    }}
                  >
                    <View style={styles.dropdownItemLeft}>
                      <Text style={styles.dropdownItemText}>{turf.name}</Text>
                      <Text style={styles.dropdownItemSubtext}>{turf.location} • {turf.distance}</Text>
                    </View>
                    <View style={styles.sportTag}>
                      <Text style={styles.sportTagText}>{turf.sport}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.formLabel}>Location</Text>
            <TextInput
              style={[styles.formInput, styles.readOnlyInput]}
              placeholder="Auto-filled from turf selection"
              placeholderTextColor="#999"
              value={selectedLocation}
              editable={false}
            />

            {/* Date Selection */}
            <Text style={styles.formLabel}>Available Date</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(!showDatePicker)}
            >
              <Ionicons name="calendar" size={20} color="#667eea" />
              <Text style={[styles.datePickerText, !selectedDate && styles.placeholderText]}>
                {selectedDate
                  ? selectedDate.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })
                  : 'Select date'}
              </Text>
              {selectedDate && (
                <TouchableOpacity
                  onPress={() => setSelectedDate(null)}
                  style={styles.clearButton}
                >
                  <Ionicons name="close-circle" size={18} color="#999" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            {showDatePicker && (
              <View style={styles.datePickerContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {getNextSevenDays().map((day, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dateOption,
                        selectedDate?.toDateString() === day.date.toDateString() && styles.dateOptionSelected,
                        day.isWeekend && styles.dateOptionWeekend,
                      ]}
                      onPress={() => {
                        setSelectedDate(day.date);
                        setShowDatePicker(false);
                      }}
                    >
                      {day.isToday && (
                        <Text style={styles.todayBadge}>TODAY</Text>
                      )}
                      {day.isWeekend && (
                        <View style={styles.weekendBadge}>
                          <Text style={styles.weekendBadgeText}>WEEKEND</Text>
                        </View>
                      )}
                      <Text style={[
                        styles.dateOptionDay,
                        selectedDate?.toDateString() === day.date.toDateString() && styles.dateOptionTextSelected,
                      ]}>
                        {day.dayName}
                      </Text>
                      <Text style={[
                        styles.dateOptionNumber,
                        selectedDate?.toDateString() === day.date.toDateString() && styles.dateOptionTextSelected,
                      ]}>
                        {day.dayNum}
                      </Text>
                      <Text style={[
                        styles.dateOptionMonth,
                        selectedDate?.toDateString() === day.date.toDateString() && styles.dateOptionTextSelected,
                      ]}>
                        {day.month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Time Selection */}
            <Text style={styles.formLabel}>Available Time</Text>

            {/* From Time */}
            <Text style={styles.timeSubLabel}>From:</Text>
            <View style={styles.timeInputContainer}>
              <TextInput
                style={styles.timeInput}
                placeholder="HH"
                placeholderTextColor="#999"
                value={availableFromHour}
                onChangeText={setAvailableFromHour}
                keyboardType="number-pad"
                maxLength={2}
              />
              <Text style={styles.timeSeparator}>:</Text>
              <TextInput
                style={styles.timeInput}
                placeholder="MM"
                placeholderTextColor="#999"
                value={availableFromMin}
                onChangeText={setAvailableFromMin}
                keyboardType="number-pad"
                maxLength={2}
              />
              <View style={styles.periodSelector}>
                <TouchableOpacity
                  style={[styles.periodButton, availableFromPeriod === 'AM' && styles.periodButtonActive]}
                  onPress={() => setAvailableFromPeriod('AM')}
                >
                  <Text style={[styles.periodText, availableFromPeriod === 'AM' && styles.periodTextActive]}>
                    AM
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.periodButton, availableFromPeriod === 'PM' && styles.periodButtonActive]}
                  onPress={() => setAvailableFromPeriod('PM')}
                >
                  <Text style={[styles.periodText, availableFromPeriod === 'PM' && styles.periodTextActive]}>
                    PM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* To Time */}
            <Text style={styles.timeSubLabel}>To:</Text>
            <View style={styles.timeInputContainer}>
              <TextInput
                style={styles.timeInput}
                placeholder="HH"
                placeholderTextColor="#999"
                value={availableToHour}
                onChangeText={setAvailableToHour}
                keyboardType="number-pad"
                maxLength={2}
              />
              <Text style={styles.timeSeparator}>:</Text>
              <TextInput
                style={styles.timeInput}
                placeholder="MM"
                placeholderTextColor="#999"
                value={availableToMin}
                onChangeText={setAvailableToMin}
                keyboardType="number-pad"
                maxLength={2}
              />
              <View style={styles.periodSelector}>
                <TouchableOpacity
                  style={[styles.periodButton, availableToPeriod === 'AM' && styles.periodButtonActive]}
                  onPress={() => setAvailableToPeriod('AM')}
                >
                  <Text style={[styles.periodText, availableToPeriod === 'AM' && styles.periodTextActive]}>
                    AM
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.periodButton, availableToPeriod === 'PM' && styles.periodButtonActive]}
                  onPress={() => setAvailableToPeriod('PM')}
                >
                  <Text style={[styles.periodText, availableToPeriod === 'PM' && styles.periodTextActive]}>
                    PM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.9}
              onPress={handleSaveTeam}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.saveGradient}
              >
                <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                <Text style={styles.saveButtonText}>Create Team</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
          </View>
        </ScrollView>
      )}

      {/* Browse Teams View */}
      {currentView === 'browse' && (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <TouchableOpacity
              style={styles.backLink}
              onPress={() => setCurrentView('main')}
            >
              <Ionicons name="arrow-back" size={20} color="#667eea" />
              <Text style={styles.backLinkText}>Back to options</Text>
            </TouchableOpacity>
          )}
          renderItem={({ item }) => (
            <View style={styles.teamCard}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.teamCardGradient}
              >
                <View style={styles.teamCardHeader}>
                  <View style={styles.teamCardIconWrapper}>
                    <Ionicons
                      name={item.sport === 'Football' ? 'football' : 'fitness'}
                      size={32}
                      color="#FFF"
                    />
                  </View>
                  <View style={styles.teamCardHeaderInfo}>
                    <Text style={styles.teamCardName}>{item.teamName}</Text>
                    <View style={styles.teamCardBadges}>
                      <View style={styles.teamCardBadge}>
                        <Text style={styles.teamCardBadgeText}>{item.format}</Text>
                      </View>
                      <View style={styles.teamCardBadge}>
                        <Text style={styles.teamCardBadgeText}>{item.sport}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.teamCardTime}>
                    <Ionicons name="time" size={14} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.teamCardTimeText}>{item.createdAt}</Text>
                  </View>
                </View>

                <View style={styles.teamCardDivider} />

                <View style={styles.teamCardBody}>
                  <View style={styles.teamCardRow}>
                    <Ionicons name="person" size={16} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.teamCardLabel}>Captain:</Text>
                    <Text style={styles.teamCardValue}>{item.captainName}</Text>
                  </View>
                  <View style={styles.teamCardRow}>
                    <Ionicons name="location" size={16} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.teamCardLabel}>Location:</Text>
                    <Text style={styles.teamCardValue}>{item.location}</Text>
                  </View>
                  <View style={styles.teamCardRow}>
                    <Ionicons name="business" size={16} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.teamCardLabel}>Turf:</Text>
                    <Text style={styles.teamCardValue} numberOfLines={1}>{item.turf}</Text>
                  </View>
                  <View style={styles.teamCardRow}>
                    <Ionicons name="calendar" size={16} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.teamCardLabel}>Date:</Text>
                    <Text style={styles.teamCardValue}>{item.availableDate}</Text>
                  </View>
                  <View style={styles.teamCardRow}>
                    <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.teamCardLabel}>Time:</Text>
                    <Text style={styles.teamCardValue}>
                      {item.availableFrom} - {item.availableTo}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.challengeButton}
                  activeOpacity={0.9}
                  onPress={() => handleChallengeTeam(item)}
                >
                  <LinearGradient
                    colors={['#f093fb', '#f5576c']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.challengeButtonGradient}
                  >
                    <Ionicons name="flash" size={20} color="#FFF" />
                    <Text style={styles.challengeButtonText}>Send Challenge</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
          contentContainerStyle={styles.teamsListContainer}
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
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
  mainContainer: {
    padding: 20,
  },
  optionCard: {
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  optionDisabled: {
    opacity: 0.6,
  },
  optionGradient: {
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  optionIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
  },
  optionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
    flex: 1,
  },
  optionArrow: {
    position: 'absolute',
    right: 20,
    top: '50%',
  },
  myTeamCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  myTeamGradient: {
    padding: 20,
  },
  myTeamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  myTeamLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  myTeamName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12,
  },
  myTeamDetails: {
    flexDirection: 'row',
    gap: 10,
  },
  myTeamBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  myTeamBadgeText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
  },
  formContainer: {
    padding: 20,
  },
  backLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backLinkText: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '500',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    marginTop: 12,
  },
  formInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1a1a1a',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  readOnlyInput: {
    backgroundColor: '#f9f9f9',
    color: '#666',
  },
  sportSelection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  sportOption: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sportOptionActive: {
    shadowColor: '#667eea',
    shadowOpacity: 0.3,
    elevation: 6,
  },
  sportOptionGradient: {
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  sportOptionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666',
  },
  sportOptionTextActive: {
    color: '#FFF',
  },
  formatSelection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  formatOption: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  formatOptionActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  formatOptionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666',
  },
  formatOptionTextActive: {
    color: '#FFF',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownButtonText: {
    fontSize: 15,
    color: '#1a1a1a',
  },
  placeholderText: {
    color: '#999',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 10,
    maxHeight: 200,
  },
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemLeft: {
    flex: 1,
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  dropdownItemSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  sportTag: {
    backgroundColor: '#667eea',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sportTagText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFF',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 10,
  },
  datePickerText: {
    fontSize: 15,
    color: '#1a1a1a',
    flex: 1,
  },
  clearButton: {
    padding: 4,
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateOption: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginRight: 12,
    minWidth: 80,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateOptionSelected: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  dateOptionWeekend: {
    backgroundColor: '#fff3e0',
    borderColor: '#ffb74d',
  },
  todayBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#667eea',
    backgroundColor: '#e8eaf6',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  weekendBadge: {
    position: 'absolute',
    top: 5,
    backgroundColor: '#ffb74d',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  weekendBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFF',
  },
  dateOptionDay: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateOptionNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  dateOptionMonth: {
    fontSize: 12,
    color: '#666',
  },
  dateOptionTextSelected: {
    color: '#FFF',
  },
  timeSubLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    marginBottom: 8,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  timeInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: 60,
    textAlign: 'center',
  },
  timeSeparator: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
    marginLeft: 10,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  periodButtonActive: {
    backgroundColor: '#667eea',
  },
  periodText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  periodTextActive: {
    color: '#FFF',
  },
  saveButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 30,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveGradient: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  teamsListContainer: {
    padding: 20,
  },
  teamCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  teamCardGradient: {
    padding: 20,
  },
  teamCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  teamCardIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamCardHeaderInfo: {
    flex: 1,
  },
  teamCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 6,
  },
  teamCardBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  teamCardBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  teamCardBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  teamCardTime: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  teamCardTimeText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginTop: 2,
  },
  teamCardDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 15,
  },
  teamCardBody: {
    gap: 10,
  },
  teamCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamCardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    width: 80,
  },
  teamCardValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFF',
    flex: 1,
  },
  challengeButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 15,
  },
  challengeButtonGradient: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  challengeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});