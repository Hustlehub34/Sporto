import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SPORTS = [
  { id: 1, name: 'Cricket', icon: 'sports-cricket', color: '#FF9800' },
  { id: 2, name: 'Football', icon: 'sports-soccer', color: '#4CAF50' },
  { id: 3, name: 'Badminton', icon: 'sports-tennis', color: '#2196F3' },
  { id: 4, name: 'Tennis', icon: 'sports-tennis', color: '#9C27B0' },
];

const generateCalendar = () => {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date: date.getDate(),
      day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      fullDate: date,
      isToday: i === 0,
    });
  }
  return days;
};

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 1; hour <= 12; hour++) {
    slots.push({
      id: hour,
      time: `${hour} PM`,
      available: Math.random() > 0.3, // Random availability for demo
    });
  }
  return slots;
};

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSport, setSelectedSport] = useState(null);
  const [startTime, setStartTime] = useState('06:00 PM');
  const [duration, setDuration] = useState(2);

  const calendar = generateCalendar();
  const timeSlots = generateTimeSlots();

  const handleContinue = () => {
    router.push({
      pathname: '/checkout',
      params: {
        turfName: params.turfName,
        date: calendar[selectedDate].fullDate.toLocaleDateString(),
        startTime,
        duration,
        price: params.price,
      },
    });
  };

  const handleIncreaseDuration = () => {
    if (duration < 5) setDuration(duration + 0.5);
  };

  const handleDecreaseDuration = () => {
    if (duration > 0.5) setDuration(duration - 0.5);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{params.turfName || 'Battledoor Academy'}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Sport Icons */}
      <View style={styles.sportIconsContainer}>
        {SPORTS.map((sport) => (
          <TouchableOpacity
            key={sport.id}
            style={[
              styles.sportIcon,
              selectedSport === sport.id && { backgroundColor: sport.color },
            ]}
            onPress={() => setSelectedSport(sport.id)}
          >
            <MaterialIcons
              name={sport.icon as any}
              size={28}
              color={selectedSport === sport.id ? '#fff' : sport.color}
            />
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Calendar */}
        <View style={styles.section}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthText}>June 2024</Text>
            <View style={styles.calendarArrows}>
              <TouchableOpacity style={styles.arrowButton}>
                <MaterialIcons name="chevron-left" size={24} color="#FF9800" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.arrowButton}>
                <MaterialIcons name="chevron-right" size={24} color="#FF9800" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.weekDaysRow}>
            <Text style={styles.weekDay}>SUN</Text>
            <Text style={styles.weekDay}>MON</Text>
            <Text style={styles.weekDay}>TUE</Text>
            <Text style={styles.weekDay}>WED</Text>
            <Text style={styles.weekDay}>THU</Text>
            <Text style={styles.weekDay}>FRI</Text>
            <Text style={styles.weekDay}>SAT</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.calendarScroll}
          >
            {calendar.slice(0, 7).map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateItem,
                  selectedDate === index && styles.selectedDateItem,
                ]}
                onPress={() => setSelectedDate(index)}
              >
                <Text
                  style={[
                    styles.dateNumber,
                    selectedDate === index && styles.selectedDateText,
                  ]}
                >
                  {day.date}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Availability Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Slide to check availability</Text>

          <View style={styles.timelineContainer}>
            {timeSlots.map((slot) => (
              <View key={slot.id} style={styles.timelineItem}>
                <View
                  style={[
                    styles.timelineDot,
                    slot.available ? styles.availableDot : styles.bookedDot,
                  ]}
                />
                {slot.id === 1 && <Text style={styles.timeLabel}>1 PM</Text>}
                {slot.id === 6 && <Text style={styles.timeLabel}>6 PM</Text>}
                {slot.id === 12 && <Text style={styles.timeLabel}>12 PM</Text>}
              </View>
            ))}
          </View>

          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.bookedDot]} />
              <Text style={styles.legendText}>Booked slot</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.availableDot]} />
              <Text style={styles.legendText}>Available slot</Text>
            </View>
          </View>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <View style={styles.timeSelectionRow}>
            <View style={styles.timeSelectionItem}>
              <Text style={styles.timeLabel}>Start Time</Text>
              <View style={styles.timeSelector}>
                <Text style={styles.timeValue}>{startTime}</Text>
                <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
              </View>
            </View>

            <View style={styles.timeSelectionItem}>
              <Text style={styles.timeLabel}>Duration</Text>
              <View style={styles.durationSelector}>
                <TouchableOpacity
                  style={styles.durationButton}
                  onPress={handleDecreaseDuration}
                >
                  <MaterialIcons name="remove" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.durationValue}>{duration} hrs</Text>
                <TouchableOpacity
                  style={styles.durationButton}
                  onPress={handleIncreaseDuration}
                >
                  <MaterialIcons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Price */}
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Total Price:</Text>
          <Text style={styles.priceValue}>INR {(params.price || 400) * duration}</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

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
  sportIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    gap: 15,
  },
  sportIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  calendarArrows: {
    flexDirection: 'row',
    gap: 10,
  },
  arrowButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  weekDay: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    width: (width - 40) / 7,
    textAlign: 'center',
  },
  calendarScroll: {
    marginHorizontal: -5,
  },
  dateItem: {
    width: (width - 40) / 7,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: 8,
  },
  selectedDateItem: {
    backgroundColor: '#FF9800',
  },
  dateNumber: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  selectedDateText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
    position: 'relative',
  },
  timelineItem: {
    alignItems: 'center',
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  bookedDot: {
    backgroundColor: '#FF9800',
  },
  availableDot: {
    backgroundColor: '#E0E0E0',
  },
  timeLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 13,
    color: '#666',
  },
  timeSelectionRow: {
    flexDirection: 'row',
    gap: 20,
  },
  timeSelectionItem: {
    flex: 1,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  timeValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  durationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  durationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  continueButton: {
    backgroundColor: '#FF9800',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});