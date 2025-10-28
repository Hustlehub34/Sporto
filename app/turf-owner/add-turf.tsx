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
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface Sport {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

export default function AddTurfScreen() {
  const router = useRouter();

  // Form State
  const [turfName, setTurfName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');

  // Amenities
  const [amenities, setAmenities] = useState([
    { id: '1', name: 'Parking', icon: 'local-parking', selected: false },
    { id: '2', name: 'Restrooms', icon: 'wc', selected: false },
    { id: '3', name: 'Changing Room', icon: 'meeting-room', selected: false },
    { id: '4', name: 'First Aid', icon: 'local-hospital', selected: false },
    { id: '5', name: 'Drinking Water', icon: 'local-drink', selected: false },
    { id: '6', name: 'Lighting', icon: 'lightbulb', selected: false },
    { id: '7', name: 'Seating', icon: 'event-seat', selected: false },
    { id: '8', name: 'Equipment Rental', icon: 'sports-cricket', selected: false },
  ]);

  // Sports
  const [sports, setSports] = useState<Sport[]>([
    { id: '1', name: 'Cricket', icon: 'sports-cricket', selected: false },
    { id: '2', name: 'Football', icon: 'sports-soccer', selected: false },
    { id: '3', name: 'Badminton', icon: 'sports-tennis', selected: false },
    { id: '4', name: 'Basketball', icon: 'sports-basketball', selected: false },
    { id: '5', name: 'Volleyball', icon: 'sports-volleyball', selected: false },
    { id: '6', name: 'Tennis', icon: 'sports-tennis', selected: false },
  ]);

  // Do's and Don'ts
  const [dos, setDos] = useState([
    'Wear appropriate sports attire',
    'Arrive on time',
    'Maintain cleanliness',
  ]);
  const [donts, setDonts] = useState([
    'No smoking',
    'No alcohol',
    'No outside food',
  ]);

  // Photos
  const [photos, setPhotos] = useState<string[]>([]);

  // Operating Hours
  const [openingTime, setOpeningTime] = useState('06:00 AM');
  const [closingTime, setClosingTime] = useState('11:00 PM');

  const toggleAmenity = (id: string) => {
    setAmenities(amenities.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const toggleSport = (id: string) => {
    setSports(sports.map(item =>
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const handleAddPhoto = () => {
    Alert.alert('Add Photo', 'Photo picker will open here');
    // In production, use expo-image-picker
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const addDo = () => {
    Alert.prompt('Add Do', 'Enter a rule:', (text) => {
      if (text) setDos([...dos, text]);
    });
  };

  const addDont = () => {
    Alert.prompt('Add Don\'t', 'Enter a restriction:', (text) => {
      if (text) setDonts([...donts, text]);
    });
  };

  const removeDo = (index: number) => {
    setDos(dos.filter((_, i) => i !== index));
  };

  const removeDont = (index: number) => {
    setDonts(donts.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!turfName || !description || !location || !pricePerHour) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const selectedSports = sports.filter(s => s.selected);
    if (selectedSports.length === 0) {
      Alert.alert('Error', 'Please select at least one sport');
      return;
    }

    Alert.alert(
      'Success',
      'Your turf has been added successfully!',
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
        <Text style={styles.headerTitle}>Add New Turf</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Turf Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter turf name"
              value={turfName}
              onChangeText={setTurfName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your turf, facilities, and features..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Location Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Area/Locality <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Koramangala, Bangalore"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter complete address"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pincode"
              value={pincode}
              onChangeText={setPincode}
              keyboardType="numeric"
              maxLength={6}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Sports Available */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sports Available <Text style={styles.required}>*</Text></Text>
          <View style={styles.sportsGrid}>
            {sports.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                style={[styles.sportCard, sport.selected && styles.sportCardSelected]}
                onPress={() => toggleSport(sport.id)}
              >
                <MaterialIcons
                  name={sport.icon as any}
                  size={32}
                  color={sport.selected ? '#4CAF50' : '#999'}
                />
                <Text style={[styles.sportName, sport.selected && styles.sportNameSelected]}>
                  {sport.name}
                </Text>
                {sport.selected && (
                  <View style={styles.checkBadge}>
                    <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities & Facilities</Text>
          <View style={styles.amenitiesGrid}>
            {amenities.map((amenity) => (
              <TouchableOpacity
                key={amenity.id}
                style={[styles.amenityChip, amenity.selected && styles.amenityChipSelected]}
                onPress={() => toggleAmenity(amenity.id)}
              >
                <MaterialIcons
                  name={amenity.icon as any}
                  size={20}
                  color={amenity.selected ? '#4CAF50' : '#666'}
                />
                <Text style={[styles.amenityText, amenity.selected && styles.amenityTextSelected]}>
                  {amenity.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Price Per Hour <Text style={styles.required}>*</Text></Text>
            <View style={styles.priceInput}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.priceTextInput}
                placeholder="0"
                value={pricePerHour}
                onChangeText={setPricePerHour}
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>

        {/* Operating Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Operating Hours</Text>

          <View style={styles.timeRow}>
            <View style={styles.timeInput}>
              <Text style={styles.label}>Opening Time</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Ionicons name="time" size={20} color="#4CAF50" />
                <Text style={styles.timeText}>{openingTime}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.timeInput}>
              <Text style={styles.label}>Closing Time</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Ionicons name="time" size={20} color="#4CAF50" />
                <Text style={styles.timeText}>{closingTime}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <Text style={styles.sectionSubtitle}>Add photos of your turf (Min 3 photos)</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
            <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
              <MaterialIcons name="add-a-photo" size={32} color="#4CAF50" />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>

            {photos.map((photo, index) => (
              <View key={index} style={styles.photoItem}>
                <Image source={{ uri: photo }} style={styles.photoImage} />
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => handleRemovePhoto(index)}
                >
                  <MaterialIcons name="close" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Do's */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Do's</Text>
            <TouchableOpacity style={styles.addButton} onPress={addDo}>
              <MaterialIcons name="add" size={20} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          {dos.map((item, index) => (
            <View key={index} style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.ruleText}>{item}</Text>
              <TouchableOpacity onPress={() => removeDo(index)}>
                <MaterialIcons name="close" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Don'ts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Don'ts</Text>
            <TouchableOpacity style={styles.addButton} onPress={addDont}>
              <MaterialIcons name="add" size={20} color="#F44336" />
            </TouchableOpacity>
          </View>
          {donts.map((item, index) => (
            <View key={index} style={styles.ruleItem}>
              <Ionicons name="close-circle" size={20} color="#F44336" />
              <Text style={styles.ruleText}>{item}</Text>
              <TouchableOpacity onPress={() => removeDont(index)}>
                <MaterialIcons name="close" size={20} color="#999" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Verification Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Information</Text>
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#2196F3" />
            <Text style={styles.infoText}>
              Your turf will be verified by our team within 24-48 hours. You'll receive a notification once it's approved.
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <MaterialIcons name="check-circle" size={22} color="#fff" />
          <Text style={styles.submitButtonText}>Add Turf</Text>
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
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
    marginTop: -10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
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
  sportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sportCard: {
    width: '30%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  sportCardSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  sportName: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  sportNameSelected: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  checkBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  amenityChipSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  amenityText: {
    fontSize: 13,
    color: '#666',
  },
  amenityTextSelected: {
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
  photosScroll: {
    flexDirection: 'row',
  },
  addPhotoButton: {
    width: 120,
    height: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
    marginRight: 12,
  },
  addPhotoText: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 8,
    fontWeight: '600',
  },
  photoItem: {
    width: 120,
    height: 120,
    marginRight: 12,
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    gap: 10,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 15,
    gap: 12,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    lineHeight: 20,
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
